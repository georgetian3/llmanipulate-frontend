"use client";
import "../styles/choices_page.css";

type OptionCardProps = {
    title: string;
    description: string;
    score: number;
    onScoreChange: (value: number) => void;
};

export default function OptionCard({ title, description, score, onScoreChange }: OptionCardProps) {
    return (
        <div className="option-card">
            <h2 className="option-card-title">{title}</h2>
            <p className="option-card-description">{description}</p>
            <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={score}
                onChange={(e) => onScoreChange(Number(e.target.value))}
                className="option-slider"
            />
            <p className="option-score">Score: {score}</p>
        </div>
    );
}
