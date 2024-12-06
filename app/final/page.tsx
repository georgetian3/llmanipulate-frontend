"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStateContext } from "../context/StateContext";

export default function FinalPage() {
    const router = useRouter();
    const { state } = useStateContext(); // Access global state
    const { name } = state;
    return (
        <div className="final-page-container">
            <h1>Thank You!</h1>
            <p>You have completed all tasks. We appreciate your effort!</p>
            <button
                onClick={() => router.push("/tasks")} // Navigate back to tasks page
                className="btn-back"
            >
                Go Back to Tasks
            </button>
        </div>
    );
}