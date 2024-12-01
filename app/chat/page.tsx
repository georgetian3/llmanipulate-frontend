"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChatBox from "../../components/ChatBox";
import ChatOptionCard from "../../components/ChatOptionCard";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../../styles/chat_page.css";
import tasks_list from "../../data/tasks.json";
import Slider from "@/components/Slider";
import "../../styles/debug.css";


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


type TaskType = "Financial" | "Emotional";

type LLMInput = {
    user_id: string;
    task_id: string;
    message: string;
};
type LLMResponse = {
    error: string;
    response: string;
};

export default function ChatPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const websocketRef = useRef<WebSocket | null>(null);
    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
    const messageQueue = useRef<string[]>([]);

    const userId = searchParams.get("userId") || "";
    const name = searchParams.get("name") || "User";
    const taskType: TaskType = (searchParams.get("taskType") as TaskType) || "Financial";
    const taskId = searchParams.get("taskId") || "";

    const [task, setTask] = useState<Task | null>(null);
    const [messagesCount, setMessagesCount] = useState(0);
    const [chatHistory, setChatHistory] = useState<{ user: string; agent: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const initialScores = searchParams.get("initialScores")
        ? JSON.parse(decodeURIComponent(searchParams.get("initialScores")!))
        : { scores: [], confidence: 5, familiarity: 5 };

    const [finalScores, setFinalScores] = useState({
        options: initialScores.scores,
        confidence: initialScores.confidence,
        familiarity: initialScores.familiarity,
    });

    const minMessages = 5;

    useEffect(() => {
        if (taskType && taskId && tasks_list[taskType]) {
            const taskList = tasks_list[taskType];
            const selectedTask = taskList.find((task: Task) => task.task_id === Number(taskId));
            if (selectedTask) {
                setTask(selectedTask);
                setFinalScores((prev) => ({
                    ...prev,
                }));
            }
        }
    }, [taskType, taskId]);

    const initializeWebSocket = () => {
        const ws = new WebSocket("ws://127.0.0.1:8000/chat");

        ws.onopen = () => {
            console.log("WebSocket connection established.");
            setIsWebSocketOpen(true);

            while (messageQueue.current.length > 0) {
                ws.send(messageQueue.current.shift()!);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed.");
            setIsWebSocketOpen(false);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            setIsWebSocketOpen(false);
        };

        ws.onmessage = (event) => {
            const agentResponse = JSON.parse(event.data) as LLMResponse;
            setChatHistory((prev) => {
                const updatedHistory = [...prev];
                updatedHistory[updatedHistory.length - 1] = {
                    ...updatedHistory[updatedHistory.length - 1],
                    agent: agentResponse.response,
                };
                return updatedHistory;
            });

            setLoading(false);
        };

        websocketRef.current = ws;
    };

    const handleSendMessage = (userMessage: string) => {
        if (userMessage.trim() === "") {
            alert("Message cannot be blank");
            return;
        }

        if (!websocketRef.current) {
            initializeWebSocket();
        }

        setMessagesCount((prev) => prev + 1);
        setChatHistory((prev) => [...prev, { user: userMessage, agent: "" }]);
        setLoading(true);

        const messageData: LLMInput = {
            user_id: userId,
            task_id: taskId,
            message: userMessage,
        };

        const messageString = JSON.stringify(messageData);

        if (isWebSocketOpen && websocketRef.current?.readyState === WebSocket.OPEN) {
            websocketRef.current.send(messageString);
        } else {
            messageQueue.current.push(messageString);
        }
    };

    const handleOptionScoreChange = (value: number, index: number) => {
        setFinalScores((prevScores) => ({
            ...prevScores,
            options: prevScores.options.map((score: any, i: number) =>
                i === index ? value : score
            ),
        }));
    };

    const handleSliderChange = (field: "confidence" | "familiarity", value: number) => {
        setFinalScores((prevScores) => ({
            ...prevScores,
            [field]: value,
        }));
    };

    const submitToBackend = async () => {
        const apiUrl = "http://127.0.0.1:8000/responses";

        type ChatHistoryDict = {
            [key: number]: { user: string; agent: string };
        };

        const chatHistoryDict: ChatHistoryDict = chatHistory.reduce((acc, { user, agent }, index) => {
            acc[index] = { user, agent };
            return acc;
        }, {} as ChatHistoryDict);

        const requestBody = {
            task_id: taskId,
            initial_scores: initialScores,
            conv_history: chatHistoryDict,
            final_scores: finalScores,
        };

        try {
            const response = await fetch(`${apiUrl}?user_id=${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`API call failed: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log("API Response:", responseData);
            return true;
        } catch (error) {
            console.error("Error during API call:", error);
            return false;
        }
    };

    const handleSubmit = async () => {
        console.log("Submitting the following data:");
        console.log("Initial Scores:", initialScores);
        console.log("Chat History:", chatHistory);
        console.log("Final Scores:", finalScores);

        const isSuccess = await submitToBackend();
        if (isSuccess) {
            console.log("Data successfully submitted to the backend.");
        } else {
            console.log("Failed to submit data to the backend.");
        }

        websocketRef.current?.close();
        websocketRef.current = null;

        const query = new URLSearchParams({
            name: name,
            userId: userId,
            taskType: taskType,
        }).toString();
        router.push(`/tasks?${query}`);
    };

  const handleSendMessage = (userMessage: string) => {
    if (userMessage.trim() === "") {
      alert("Message cannot be blank");
      return;
    }

  if (!task) {
    return <div>Loading task...</div>;
  }

  return <div className="flex rounded-xl shadow-2xl h-full w-full p-4 gap-2 debug">
    <ChatBox
      onSendMessage={handleSendMessage}
      chatHistory={chatHistory}
      loading={loading}
    />
    <div className="flex flex-col items-center w-full gap-4">
      <div className="choices-section">
        {task.options.map((option, index) => (
          <ChatOptionCard
            key={option.option_id}
            title={option.option_id}
            description={option.desc.en}
            score={finalScores.options[index]}
            onScoreChange={(value) => handleOptionScoreChange(value, index)}
          />
        ))}

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
      </div>
      <button
        className={`submit-button ${messagesCount >= MIN_MESSAGES ? "" : "disabled"}`}
        onClick={messagesCount >= MIN_MESSAGES ? handleSubmit : undefined}
        disabled={messagesCount < MIN_MESSAGES}
      >
        Submit
      </button>
    </div>
  </div>
    
}

export default function ChatPageWrapper() {
  return <Suspense>
    <ChatPage />
  </Suspense>
}