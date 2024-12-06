"use client";
import "../styles/tasks_page.css";
import { useRouter } from "next/navigation";
import { useStateContext } from "../app/context/StateContext"; // Import StateContext

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
    const { setState } = useStateContext(); // Access setState from StateContext

    const handleSelectTask = () => {
        if (isCompleted) return;

        if (userId) {
            // Update the global state with task information
            setState((prev) => ({
                ...prev,
                taskType,
                taskId: task.task_id.toString(),
                userId,
                name,
            }));

            // Navigate to the choices page
            router.push("/choices");
        } else {
            console.error("userId is missing.");
        }
    };

    return (
        <div className={"task-card"}>
            <h2>{task.query.title.en}</h2>
            <p>{task.query.desc.en}</p>
            <button onClick={handleSelectTask} disabled={isCompleted}>
                {isCompleted ? "Completed" : "Select"}
            </button>
        </div>
    );
}