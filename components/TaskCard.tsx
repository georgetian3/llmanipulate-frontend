"use client";
import "../styles/tasks_page.css";
import { useRouter } from "next/navigation";

export default function TaskCard({
    task,
    taskType,
    userId,
    name,
    isCompleted,
}: {
    task: any;
    taskType: string;
    userId: string;
    name: string;
    isCompleted: boolean;
}) {
    const router = useRouter();

    const handleSelectTask = () => {
        if (isCompleted) return; 

        if (userId) {
            const query = new URLSearchParams({
                taskType,
                taskId: task.task_id,
                userId,
                name,
            }).toString();

            router.push(`/choices?${query}`);
        } else {
            console.error("userId is missing.");
        }
    };

    return (
        <div className={`task-card ${isCompleted ? "completed" : ""}`}>
            <h2>{task.query.title.en}</h2>
            <p>{task.query.desc.en}</p>
            <button onClick={handleSelectTask} disabled={isCompleted}>
                {isCompleted ? "Completed" : "Select"}
            </button>
        </div>
    );
}
