"use client";
import { useEffect, useState } from "react";
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

type TasksList = {
    Financial: Task[];
    Emotional: Task[];
};

type TaskType = "Financial" | "Emotional";

export default function TasksPage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId") || "";
    const name = searchParams.get("name") || "User";
    const taskType: TaskType = searchParams.get("taskType") as TaskType;

    const [tasks, setTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("Updated completedTasks state:", completedTasks);
    }, [completedTasks]);
    useEffect(() => {
        if (taskType && tasks_list[taskType]) {
            setTasks(tasks_list[taskType] || []);
        } else {
            setTasks([]);
        }
        const fetchCompletedTasks = async () => {
            try {
                const response = await fetch(`http://localhost:8000/responses_by_user?user_id=${userId}`, {
                    method: "GET"
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    const taskIds = data.map((item: any) => Number(item.task_id));
                    setCompletedTasks(taskIds);
                }
            } catch (error) {
                console.error("Error fetching completed tasks:", error);
            } finally {
                setLoading(false);
                console.log(completedTasks);
            }
        };

        fetchCompletedTasks();
    }, [taskType, userId]);

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div className="tasks-container">
            <h1>Welcome, {name}</h1>
            <h2>Select a Task</h2>
            <div className="task-cards">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.task_id}
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
