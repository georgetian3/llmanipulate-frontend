"use client";
import "../styles/chat_page.css";

type OptionCardProps = {
  title: string;
  description: string;
  score: number;
  onScoreChange: (value: number) => void;
};

export default function ChatOptionCard({ title, description, score, onScoreChange }: OptionCardProps) {
  return (
    <div className="option-card">
      <h1>{title}</h1>
      <div className="option-card-accordion">
        <button>f</button>
        <p>{description}</p>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        step="1"
        value={score}
        onChange={(e) => onScoreChange(Number(e.target.value))}
        className="option-slider"
      />
      <p>Score: {score}</p>
    </div>
  );
}
