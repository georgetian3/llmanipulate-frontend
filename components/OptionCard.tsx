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
      <div>
        <h2 className="option-card-title">{title}</h2>
        <p className="option-card-description">{description}</p>
      </div>
      <Slider
        label="Preference for this option"
        value={score}
        onChange={(newValue) => onScoreChange(newValue)}
      />
    </div>
  );
}