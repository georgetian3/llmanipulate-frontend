"use client";
import {useState} from "react";
import { useRouter } from "next/navigation";
import "../../styles/login_page.css";
import { apiRequest } from "../utils";
import { useStateContext } from "../context/StateContext";


export default function LoginPage() {
    const [usercode, setUsercode] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setState } = useStateContext();

    async function fetchUserData(userId: string) {
        try {
            const response = await apiRequest(`/users/${userId}`, "GET")
            if (response.ok) {
                return await response.json();
            } else if (response.status === 404) {
                return null;
            } else {
                throw new Error(`Unexpected server error: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!usercode.trim()) {
            alert("Please enter a Usercode.");
            return;
        }

        setLoading(true);
        try {
            const userData = await fetchUserData(usercode.trim());
            if (!userData) {
                alert("No matching User found. Please try again.");
                return;
            }

            const state = {
                taskType: userData.task_type,
                taskId: "",
                userId: usercode.trim(),
                name: userData.demographics.name,
                initialScores: { A:1,B:1,C:1,D:1, confidence: 1, familiarity: 1 },
                options: [],
            };

            if (localStorage.getItem("state"))
                localStorage.removeItem("state");
            setState(state);


            router.push(`/tasks?`);
        } catch (error) {
            console.error("Error during login:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Please enter your passcode below</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    // placeholder="Enter Usercode"
                    value={usercode}
                    onChange={(e) => setUsercode(e.target.value)}
                    className="login-input"
                />
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
