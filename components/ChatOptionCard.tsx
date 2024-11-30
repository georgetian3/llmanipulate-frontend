"use client";
import { useState } from "react";
import "../styles/chat_page.css";
import Slider from "./Slider";

type OptionCardProps = {
  title: string;
  description: string;
  score: number;
  onScoreChange: (value: number) => void;
};

function Accordion({text}: {text: string}) {
  const [expanded, setExpanded] = useState(false)

  return <div className="bg-white rounded p-2">      
    <div onClick={() => setExpanded(!expanded)} className="flex justify-between items-center cursor-pointer">
      <div>
        See details
      </div>
      <div className="text-2xl">
        {expanded ? "▾" : "◂"}
      </div>
    </div>
    {expanded && <div className="text-justify">
      {text}
    </div>}
  </div>
}

export default function ChatOptionCard({ title, description, score, onScoreChange }: OptionCardProps) {
  return (
    <div className="space-y-4">
      <h1>{title}</h1>
      <Accordion text={description} />
      <Slider
        label="Preference for this option"
        value={score}
        onChange={(newValue) => onScoreChange(newValue)}
      />
    </div>
  );
}
