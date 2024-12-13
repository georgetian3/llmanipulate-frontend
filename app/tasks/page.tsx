"use client";

import { Suspense, useEffect, useState,useCallback } from "react";
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

function TasksPage() {
  const { state, setState } = useStateContext(); // Use setState for global updates
  const { userId, name, taskType } = state;
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Restore global state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("state");
    if (savedState) {
      setState((prev) => ({ ...prev, ...JSON.parse(savedState) }));
    }
  }, [setState]);

  // Persist global state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  // Fetch tasks and completed tasks
  useEffect(() => {
    if (taskType && tasks_list[taskType as keyof typeof tasks_list]) {
      setTasks(tasks_list[taskType as keyof typeof tasks_list] || []);
    } else {
      setTasks([]);
    }
  }, [taskType]);

  const fetchCompletedTasks = useCallback(async () => {
    try {
      const response = await apiRequest(`/responses_by_user?user_id=${userId}`, "GET");
      const data = await response.json();
      if (Array.isArray(data)) {
        setCompletedTasks(data.map((item) => Number(item.task_name)));
      }
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]); // Memoriza a função com base em `userId`

  useEffect(() => {
    if (userId) {
      fetchCompletedTasks();
    }
  }, [taskType, userId, fetchCompletedTasks]);

  // Navigate to the final page when all tasks are completed
  useEffect(() => {
    const requiredTaskIds = [1, 2, 3]; // Required task IDs

    const allRequiredTasksCompleted = requiredTaskIds.every((taskId) =>
        completedTasks.includes(taskId)
    );

    if (allRequiredTasksCompleted) {
      router.push("/final");
    }
  }, [completedTasks, router]);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

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

export default function TasksPageWrapper() {
  return (
      <Suspense>
        <TasksPage />
      </Suspense>
  );
}
