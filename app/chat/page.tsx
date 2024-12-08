"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import ChatBox from "../../components/ChatBox";
import ChatOptionCard from "../../components/ChatOptionCard";
import "../../styles/chat_page.css";
import Slider from "@/components/Slider";
import { useStateContext } from "../context/StateContext";
import {apiRequest} from "@/app/utils";

type Task = {
  task_id: number;
  query: {
    title: {
      en: string;
      zh: string;
    };
    desc: {
      en: string;
      zh: string;
    };
  };
  options: {
    option_id: string;
    desc: {
      en: string;
      zh: string;
    };
    info: {};
  }[];
  hidden_incentive: string;
};

function ChatPage() {
  const router = useRouter();
  const { state } = useStateContext();
  const { taskType, taskId, userId, initialScores, taskDict } = state;

  const [task, setTask] = useState<Task | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: string; message: string; agent_data: []; }[]>([]);
  const [loading, setLoading] = useState(false);
  const [finalScores, setFinalScores] = useState({
    options: [...Array(initialScores.scores.length)].map(() => 1),
    confidence: 1,
    familiarity: 1,
  });

  const websocketRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<string[]>([]);
  const MIN_MESSAGES = 20;

  // Load the task details
  useEffect(() => {
    if (taskType && taskId) {
      const taskList = require("../../data/tasks.json")[taskType];
      const selectedTask = taskList.find((task: Task) => task.task_id === Number(taskId));
      setTask(selectedTask);
    }
  }, [taskType, taskId]);

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
        if (data.response.trim() === "") {
          alert("Agent Message cannot be blank");
          return;
        }
        console.log("Received message from agent:", data.response);
        console.log("Received data from agent:", data);
        setChatHistory((prev) => [...prev, { role: "agent", message: data.response, agent_data: data.agent_data }]);
        setLoading(false);
      };

      ws.onclose = (event) => {
        console.log("WebSocket connection closed:", event.reason);
        setTimeout(() => initializeWebSocket(), 3000); // Retry connection
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
    console.log("Received User message:", userMessage);
    setChatHistory((prev) => [...prev, { role: "user", message: userMessage, agent_data: [] }]);
    setLoading(true);

    const messageData = {
      user_id: userId,
      task_id: taskId,
      message: userMessage,
      map: taskDict,
    };

    const messageString = JSON.stringify(messageData);

    if (websocketRef.current?.readyState === WebSocket.OPEN) {
      websocketRef.current.send(messageString);
    } else {
      messageQueue.current.push(messageString);
    }
  };

  const remapScoresToOriginalOrder = (scores: number[]) => {
    return Object.keys(taskDict).map((originalOption) => {
      const remappedOption = taskDict[originalOption];
      const remappedIndex = task?.options.findIndex((opt) => opt.option_id === remappedOption);
      return remappedIndex !== undefined && remappedIndex >= 0 ? scores[remappedIndex] : 0;
    });
  };

  const handleOptionScoreChange = (value: number, index: number) => {
    setFinalScores((prevScores) => ({
      ...prevScores,
      options: prevScores.options.map((score, i) => (i === index ? value : score)),
    }));
  };

  const handleSliderChange = (field: "confidence" | "familiarity", value: number) => {
    setFinalScores((prevScores) => ({
      ...prevScores,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const remappedFinalScores = remapScoresToOriginalOrder(finalScores.options);
    const initialScoresMapped = task?.options.reduce((acc, option, index) => {
      const optionId = option.option_id;
      const score = initialScores.scores[index]; // Get the score from the initialScores list
      acc[optionId] = score; // Add the score to the accumulator object
      return acc;
    }, {});
    const finalScoresMapped = task?.options.reduce((acc, option, index) => {
        const optionId = option.option_id;
        const score = remappedFinalScores[index]; // Get the score from the finalScores list
        acc[optionId] = score; // Add the score to the accumulator object
        return acc;
    }, {});



    const requestBody = {
      user_id: userId,
      task_name: taskId,
      initial_scores: {
        ...initialScoresMapped,
        confidence: initialScores.confidence,
        familiarity: initialScores.familiarity,
      },
      final_scores: {
        ...finalScoresMapped,
        confidence: finalScores.confidence,
        familiarity: finalScores.familiarity,
      },
      conv_history: chatHistory.reduce((acc, message, index) => {
        acc[index] = message;
        return acc;
      }, {}),
    };


    console.log("Request Body Sent to Backend:", requestBody);

    try {
      console.log("Request Body Sent to Backend:", requestBody);

      const response = await apiRequest(`/submit_response`, "POST", requestBody);
      if (!response.ok) {
        const errorText = await response.text();  // Get error details
        console.error("API Error Response:", errorText);
        throw new Error(`API Error: ${response.status}`);
      }
      console.log("Data submitted successfully.,", response);
      router.push("/tasks");
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };


  if (!task) {
    return <div>Loading task...</div>;
  }

  const remappedOptions = task.options.map((option) => ({
    ...option,
    desc: task.options.find((o) => o.option_id === taskDict[option.option_id])?.desc || option.desc,
  }));

  return (
      <div className="chat-page-container">
        <h1 className="chat-page-title">{task.query.title.en}</h1>
        <h2 className="chat-page-desc">{task.query.desc.en}</h2>
        <div className="chat-page-content-container">
          <ChatBox onSendMessage={handleSendMessage} chatHistory={chatHistory} loading={loading}/>
          <div className="choices-section-container">
            <div className="choices-section">
              {remappedOptions.map((option, index) => (
                  <ChatOptionCard
                      key={option.option_id}
                      title={option.option_id}
                      description={option.desc.en}
                      score={finalScores.options[index]}
                      onScoreChange={(value) => handleOptionScoreChange(value, index)}
                  />
              ))}
            </div>
            <Slider
                label="Confidence in the above scores"
                value={finalScores.confidence}
                onChange={(newValue) => handleSliderChange("confidence", newValue)}
            />
            <Slider
                label="Familiarity with the topic of this query"
                value={finalScores.familiarity}
                onChange={(newValue) => handleSliderChange("familiarity", newValue)}
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