"use client";
import "../styles/choices_page.css";
import Slider from "./Slider";

type OptionCardProps = {
  title: string;
  description: string;
  score: number;
  onScoreChange: (value: number) => void;
};

export default function OptionCard({ title, description, score, onScoreChange }: OptionCardProps) {
  return (
    <div className="option-card bg-[#ebedf1]">
      <h2 className="option-card-title">{title}</h2>
      <p className="option-card-description">{description}</p>
      <Slider
        label="Preference for this option"
        value={score}
        onChange={(newValue) => onScoreChange(newValue)}
      />
    </div>
  );
}


// background-color: #ebedf1;
// border-radius: 12px;
// box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// padding: 20px;
// display: flex;
// flex-direction: column;
// justify-content: space-between;
// text-align: left;