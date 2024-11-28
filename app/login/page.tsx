"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/login_page.css";
import { fetchUserData } from "../../backend services/backend";

export default function LoginPage() {
    const [usercode, setUsercode] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!usercode.trim()) {
            alert("Please enter a Usercode.");
            return;
        }

        setLoading(true); 
        try {
            const userData = await fetchUserData(usercode); 
            if (!userData) {
                alert("No matching User found. Please try again.");
                return;
            }

            console.log("User Data:", userData);

            const query = new URLSearchParams({
                userId: usercode,
                name: userData.name,
                taskType: userData.taskType,
                language: userData.language,
                agentType: userData.agentType,
            }).toString();

            router.push(`/tasks?${query}`); 
        } catch (error) {
            console.error("Error during login:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Enter Usercode"
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
