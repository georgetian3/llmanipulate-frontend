"use client";

import {useState, useEffect, useRef, Suspense, useMemo} from "react";
import { useRouter } from "next/navigation";
import ChatBox from "../../components/ChatBox";
import ChatOptionCard from "../../components/ChatOptionCard";
import "../../styles/chat_page.css";
import Slider from "@/components/Slider";
import { useStateContext } from "../context/StateContext";
import { apiRequest } from "@/app/utils";
import tasks from "../../data/tasks.json";



type Task = {
  task_id: number;
  query: {
    title: { en: string; zh: string };
    desc: { en: string; zh: string };
  };
  options: {
    option_id: string;
    desc: { en: string; zh: string };
    info: {};
  }[];
  hidden_incentive: string;
};

function ChatPage() {
  const router = useRouter();
  const { state } = useStateContext();
  const { taskType, taskId, userId, initialScores } = state;
  const [options, setOptions] = useState<Task["options"]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: string; message: string; agent_data: [] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [finalScores, setFinalScores] = useState<Record<string, number>>({});
  const [confidence, setConfidence] = useState(1);
  const [familiarity, setFamiliarity] = useState(1);

  const websocketRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<string[]>([]);
  const MIN_MESSAGES = 20;
  const optionLabels = useMemo(() => ["A", "B", "C", "D"], []);


  // Load the task details
  useEffect(() => {
    if (taskType && taskId) {
      const taskList = tasks[taskType as keyof typeof tasks];
      const selectedTask = taskList.find((t) => t.task_id === Number(taskId));
      if (selectedTask) {
        setTask(selectedTask);

        // Set options from global state
        setOptions(state.options);

        // Initialize final scores to 1 for each option
        const initialFinalScores = Object.fromEntries(
            state.options.map((option) => [option.option_id, 1])
        );
        setFinalScores(initialFinalScores);

        // Initialize confidence and familiarity to 1
        setConfidence(1);
        setFamiliarity(1);
      }
    }
  }, [taskType, taskId, state.options]);

  // Initialize WebSocket
  useEffect(() => {
    const initializeWebSocket = () => {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);

      ws.onopen = () => {
        console.log("WebSocket connection established.");
        while (messageQueue.current.length > 0) {
          ws.send(messageQueue.current.shift()!);
        }
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (!data.response.trim()) {
          alert("Agent message cannot be blank");
          return;
        }
        setChatHistory((prev) => [...prev, { role: "agent", message: data.response, agent_data: data.agent_data }]);
        setLoading(false);
      };

      ws.onclose = (event) => {
        console.log("WebSocket connection closed:", event.reason);
        setTimeout(initializeWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.log("WebSocket error:", error);
      };

      websocketRef.current = ws;
    };

    initializeWebSocket();

    return () => {
      websocketRef.current?.close();
      websocketRef.current = null;
    };
  }, []);

  const handleSendMessage = (userMessage: string) => {
    if (userMessage.trim() === "") {
      alert("Message cannot be blank");
      return;
    }
    setChatHistory((prev) => [...prev, { role: "user", message: userMessage, agent_data: [] }]);
    setLoading(true);

    const messageData = {
      user_id: userId,
      task_id: taskId,
      message: userMessage,
      map: options.map((option) => option.option_id),
    };

    const messageString = JSON.stringify(messageData);

    if (websocketRef.current?.readyState === WebSocket.OPEN) {
      websocketRef.current.send(messageString);
    } else {
      messageQueue.current.push(messageString);
    }
  };

  const handleOptionScoreChange = (value: number, key: string) => {
    setFinalScores((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const sortedFinalScores = Object.fromEntries(
        Object.entries(finalScores).sort(([keyA,], [keyB,]) => keyA.localeCompare(keyB))
    );

    const requestBody = {
      user_id: userId,
      task_name: taskId,
      initial_scores: { ...initialScores },
      final_scores: {
        ...sortedFinalScores,
        confidence,
        familiarity,
      },
      conv_history: chatHistory.reduce<Record<number, { role: string; message: string; agent_data: [] }>>(
          (acc, message, index) => {
            acc[index] = message;
            return acc;
          },
          {}
      ),
    };

    try {
      const response = await apiRequest(`/submit_response`, "POST", requestBody);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API Error: ${response.status}`);
      }
      router.push("/tasks");
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  if (!task) {
    return <div>Loading task...</div>;
  }

  return (
      <div className="chat-page-container">
        <h1 className="chat-page-title">{task.query.title.en}</h1>
        <h2 className="chat-page-desc">{task.query.desc.en}</h2>
        <div className="chat-page-content-container">
          <ChatBox onSendMessage={handleSendMessage} chatHistory={chatHistory} loading={loading} />
          <div className="choices-section-container">
            <div className="choices-section">
              {options.map((option,index) => (
                  <ChatOptionCard
                      key={option.option_id}
                      title={`Option ${optionLabels[index]}`}
                      description={option.desc?.en || "No description available"}
                      score={finalScores[option.option_id] || 1}
                      onScoreChange={(value) => handleOptionScoreChange(value, option.option_id)}
                  />
              ))}
            </div>
            <Slider
                label="Confidence in the above scores"
                value={confidence}
                onChange={(newValue) => setConfidence(newValue)}
            />
            <Slider
                label="Familiarity with the topic of this query"
                value={familiarity}
                onChange={(newValue) => setFamiliarity(newValue)}
            />
            <button
                className={`submit-button ${chatHistory.length < MIN_MESSAGES ? "disabled" : ""}`}
                onClick={handleSubmit}
                disabled={chatHistory.length < MIN_MESSAGES}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
  );
}

export default function ChatPageWrapper() {
  return (
      <Suspense>
        <ChatPage />
      </Suspense>
  );
}