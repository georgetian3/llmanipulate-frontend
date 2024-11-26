"use client";
import "../styles/tasks_page.css";
import { useRouter } from "next/navigation";

export default function TaskCard({ task, taskType, userId, name }: { task: any, taskType: string, userId: string, name: string}) {
    const router = useRouter();

    const handleSelectTask = () => {
        if (userId) {  
            const query = new URLSearchParams({
                taskType,
                taskTitle: task.query.title.en,  
                userId: userId,
                name: name,
            }).toString();
        
            router.push(`/choices?${query}`);  
        } else {
            console.error("userId is missing.");
        }
    };

    return (
        <div className="task-card">
            <h2>{task.query.title.en}</h2>
            <p>{task.query.desc.en}</p>
            <button onClick={handleSelectTask}>Select</button>
        </div>
    );
}
