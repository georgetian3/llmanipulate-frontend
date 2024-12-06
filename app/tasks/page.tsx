"use client";

import { Suspense, useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard";
import "../../styles/tasks_page.css";
import tasks_list from "../../data/tasks.json";
import { apiRequest } from "../utils";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/navigation";

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

export function TasksPage() {
  const { state } = useStateContext(); // Get global state
  const { userId, name, taskType } = state;
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Log completed tasks when they are updated
  useEffect(() => {
    console.log("Updated completedTasks state:", completedTasks);
  }, [completedTasks]);

  // Fetch tasks and completed tasks
  useEffect(() => {
    if (taskType && tasks_list[taskType]) {
      setTasks(tasks_list[taskType] || []);
    } else {
      setTasks([]);
    }

    const fetchCompletedTasks = async () => {
      try {
        console.log("Fetching completed tasks for ", userId);
        const response = await apiRequest(`/responses_by_user?user_id=${userId}`, "GET");
        const data = await response.json();
        if (Array.isArray(data)) {
          const taskIds = data.map((item: any) => Number(item.task_name));
          console.log("Fetched completed tasks:", taskIds);
          setCompletedTasks(taskIds);
        }
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, [taskType, userId]);

  // Navigate to the final page when all tasks are completed
  useEffect(() => {
    if (tasks.length > 0 && completedTasks.length === tasks.length) {
      console.log("All tasks completed. Navigating to the final page.");
      router.push("/final"); // Adjust the route as needed
    }
  }, [tasks, completedTasks, router]);

  // Loading state
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  // Render tasks
  return (
      <div className="tasks-container">
        <h1 className="font-bold text-left">Welcome, {name}</h1>
        <h2>Please select one of the following scenarios:</h2>
        <div className="task-cards">
          {tasks.map((task, index) => (
              <TaskCard
                  key={index}
                  task={task}
                  taskType={taskType}
                  userId={userId}
                  name={name}
                  isCompleted={completedTasks.includes(task.task_id)}
              />
          ))}
        </div>
      </div>
  );
}

// Wrapper component for Suspense support
export default function TasksPageWrapper() {
  return (
      <Suspense>
        <TasksPage />
      </Suspense>
  );
}
