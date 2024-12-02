"use client";
import "../styles/chat_page.css";
import "../styles/debug.css";
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
  console.log(flattenedMessages);

  return <div className="chatbox">
    <div className="chatbox-section">
      {flattenedMessages.map((msg,  index) => (
        <p key={index} className={"message " + (index % 2 ? "agent-message" : "user-message")}>
          {msg}
        </p>
      ))}
    </div>
    <div className="chatinput-section">
      <input
        type="text"
        className="chat-input h-full"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button
        className="chatinput-button"
        onClick={handleSend}
        disabled={loading}
      >
        Send
      </button>
    </div>
  </div>
}


// margin-left: 10px;
//     padding: 10px 15px;
//     background-color: #6558d3;
//     border: none;
//     border-radius: 5px;
//     color: white;
//     cursor: pointer;