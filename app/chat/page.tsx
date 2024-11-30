"use client";
import ChatBox from "../../components/ChatBox";
import ChatOptionCard from "../../components/ChatOptionCard";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../../styles/chat_page.css";
import tasks_list from "../../data/tasks.json";
import Slider from "@/components/Slider";

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

function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId") || "";
  const name = searchParams.get("name") || "User";
  const taskType: TaskType = (searchParams.get("taskType") as TaskType) || "Financial";
  const taskTitle = searchParams.get("taskTitle") || "";

  const [task, setTask] = useState<Task | null>(null);
  const [messagesCount, setMessagesCount] = useState(0);
  const [chatHistory, setChatHistory] = useState<{ user: string; agent: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const initialScores = searchParams.get("initialScores") ? JSON.parse(decodeURIComponent(searchParams.get("initialScores")!)) : { scores: [], confidence: 5, familiarity: 5 };

  const [finalScores, setFinalScores] = useState({
    options: initialScores.scores,
    confidence: initialScores.confidence,
    familiarity: initialScores.familiarity,
  });

  const minMessages = 5;

  useEffect(() => {
    if (taskType && taskTitle && tasks_list[taskType]) {
      const taskList = tasks_list[taskType];
      const selectedTask = taskList.find((task: Task) => task.query.title.en === taskTitle);
      if (selectedTask) {
        setTask(selectedTask);
        setFinalScores((prev) => ({
          ...prev,
        }));
      }
    }
  }, [taskType, taskTitle]);

  const handleSendMessage = (userMessage: string) => {
    if (userMessage.trim() === "") {
      alert("Message cannot be blank");
      return;
    }

    setMessagesCount((prev) => prev + 1);
    setChatHistory((prev) => [...prev, { user: userMessage, agent: "" }]);

    setLoading(true);
    setTimeout(() => {
      const agentResponse = `Agent Response ${messagesCount + 1}`;
      setChatHistory((prev) => {
        const updatedHistory = [...prev];
        updatedHistory[updatedHistory.length - 1] = {
          ...updatedHistory[updatedHistory.length - 1],
          agent: agentResponse,
        };
        return updatedHistory;
      });
      setLoading(false);
    }, 100);
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
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting the following data:");
    console.log("Initial Scores:", initialScores)
    console.log("Chat History:", chatHistory);
    console.log("Final Scores:", finalScores);

    const query = new URLSearchParams({
      name: name,
      userId: userId,
      taskType: taskType,
    }).toString();
    router.push(`/tasks?${query}`);
  };

  if (!task) {
    return <div>Loading task...</div>;
  }

  return (
    <div className="chat-page-container">
      <div className="main-content">
        <div className="chatbox-section">
          <ChatBox
            onSendMessage={handleSendMessage}
            chatHistory={chatHistory}
            loading={loading}
          />
        </div>
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

          <div className="">
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
        </div>
      </div>
      <div className="footer">
        <button
          className={`submit-button ${messagesCount >= minMessages ? "" : "disabled"}`}
          onClick={messagesCount >= minMessages ? handleSubmit : undefined}
          disabled={messagesCount < minMessages}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default function ChatPageWrapper() {
  return <Suspense>
    <ChatPage />
  </Suspense>
}