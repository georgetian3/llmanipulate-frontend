"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TaskCard from "../../components/TaskCard";
import "../../styles/tasks_page.css";
import tasks_list from "../../data/tasks.json";

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

function TasksPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const name = searchParams.get("name") || "User";
  const taskType: TaskType = searchParams.get("taskType") as TaskType;

  // console.log("userId from query params:", userId);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (taskType && tasks_list[taskType]) {
      setTasks(tasks_list[taskType] || []);
      setLoading(false);
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [taskType]);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="tasks-container">
      <h1 className="font-bold text-left">
        Welcome, {name}
      </h1>
      <h2>Select a Task</h2>
      <div className="task-cards">
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            taskType={taskType}
            userId={userId}
            name={name}
          />
        ))}
      </div>
    </div>
  );
}

export default function TasksPageWrapper() {
  return <Suspense>
      <TasksPage />
  </Suspense>
}