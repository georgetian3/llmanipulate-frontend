"use client";
import "../styles/chat_page.css";
import { useState } from "react";

type ChatBoxProps = {
    onSendMessage: (userMessage: string) => void;
    chatHistory: { user: string; agent: string }[];  
    loading: boolean;
};

export default function ChatBox({ onSendMessage, chatHistory, loading }: ChatBoxProps) {
    const [input, setInput] = useState("");

    const flattenChatHistory = (history: { user: string; agent: string }[]) => {
        const flattenedMessages: string[] = [];

        history.forEach((pair) => {
            flattenedMessages.push(pair.user, pair.agent);
        });

        return flattenedMessages;
    };

    const handleSend = () => {
        if (input.trim() && !loading) { 
            onSendMessage(input); 
            setInput(""); 
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && input.trim() !== "" && !loading) {
            handleSend();
        }
    };

    const flattenedMessages = flattenChatHistory(chatHistory); 

    return (
        <div className="chatbox">
            <div className="chat-messages">
                {flattenedMessages.map((message, index) => (
                    <p key={index} className={index % 2 === 0 ? "user-message" : "agent-message"}>
                        {message}
                    </p>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    className="chat-input"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={loading} 
                />
                <button
                    className={`send-button ${loading ? "disabled" : ""}`} 
                    onClick={handleSend}
                    disabled={loading} 
                >
                    Send
                </button>
            </div>
        </div>
    );
}
