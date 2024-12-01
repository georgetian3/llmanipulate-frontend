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

  return <div className="flex flex-col w-full h-full rounded-2xl shadow-2xl p-4 debug">
    <div className="flex flex-col-reverse h-full overflow-y-scroll">
      {flattenedMessages.map((_,  index) => (
        <p key={index} className={"message " + ((flattenedMessages.length - index) % 2 ? "user-message" : "agent-message")}>
          {flattenedMessages[flattenedMessages.length - index - 1]}
        </p>
      ))}
    </div>
    <div className="flex w-full">
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
        className={`bg-[#6558d3] rounded-md p-2 text-white h-full ${loading ? "bg-[#c3cef8] text-[#a0a0a0] cursor-not-allowed" : ""}`}
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