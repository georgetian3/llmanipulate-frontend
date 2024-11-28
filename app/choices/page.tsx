"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../../styles/choices_page.css";
import OptionCard from "../../components/OptionCard";
import tasks_list from "../../data/tasks.json";

type Task = {
    task_id: number;
    query: {
        title: {
            en: string;
            zh: string;
        };
        desc: {
            en: string;
            zh: string;
        };
    };
    options: {
        option_id: string;
        desc: {
            en: string;
            zh: string;
        };
        info: {};
    }[];
    hidden_incentive: string;
};

type TasksList = {
    Financial: Task[];
    Emotional: Task[];
};

type TaskType = "Financial" | "Emotional";

export default function ChoicePage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const taskType: TaskType = (searchParams.get("taskType") as TaskType) || "Financial";
    const taskTitle = searchParams.get("taskTitle") || "";
    const userId = searchParams.get("userId") || "";
    const name = searchParams.get("name") || "User";

    const [task, setTask] = useState<Task | null>(null);
    const [options, setOptions] = useState<Task["options"]>([]);
    const [scores, setScores] = useState<number[]>([]);
    const [confidence, setConfidence] = useState(5);
    const [familiarity, setFamiliarity] = useState(5);

    useEffect(() => {
        if (taskType && taskTitle && tasks_list[taskType]) {
            const taskList = tasks_list[taskType];
            const selectedTask = taskList.find((task: Task) => task.query.title.en === taskTitle);
            if (selectedTask) {
                setTask(selectedTask);
                setOptions(selectedTask.options);
            }
        }
    }, [taskType, taskTitle]);

    useEffect(() => {
        if (options.length > 0) {
            setScores(Array(options.length).fill(5));
        }
    }, [options]);

    const handleScoreChange = (value: number, index: number) => {
        setScores((prevScores) => {
            const updatedScores = [...prevScores];
            updatedScores[index] = value;
            return updatedScores;
        });
    };

    const handleSubmit = () => {
        const scoresParam = encodeURIComponent(
            JSON.stringify({
                scores,
                confidence, 
                familiarity,
            })
        );
        const query = new URLSearchParams({
            taskType: taskType,               
            taskTitle: taskTitle,  
            userId: userId,         
            name: name,
            initialScores: scoresParam,
        }).toString();
    
        router.push(`/chat?${query}`);
    };
    

    if (!task) {
        return <div>Loading task...</div>;
    }

    return (
        <div className="initial-option-container">
            <h1 className="page-title">Choose Your Preferences</h1>
            <p className="instruction-text">Please rate each option based on your preference (1-10).</p>
            <div className="initial-option-cards">
                {options.map((option, index) => (
                    <OptionCard
                        key={option.option_id || index}
                        title={option.option_id}
                        description={option.desc.en}
                        score={scores[index] || 1} 
                        onScoreChange={(value) => handleScoreChange(value, index)}
                    />
                ))}
            </div>

            <div className="additional-sliders">
                <div className="slider-group">
                    <label>Confidence in the above scores</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={confidence}
                        onChange={(e) => setConfidence(Number(e.target.value))}
                        className="option-slider"
                    />
                    <p>Score: {confidence}</p>
                </div>

                <div className="slider-group">
                    <label>Familiarity with the topic of this query</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={familiarity}
                        onChange={(e) => setFamiliarity(Number(e.target.value))}
                        className="option-slider"
                    />
                    <p>Score: {familiarity}</p>
                </div>
            </div>

            <button onClick={handleSubmit} className="initial-option-submit">
                Submit Preferences
            </button>
        </div>
    );
}
