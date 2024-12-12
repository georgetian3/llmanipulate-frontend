"use client";

import { useState, useEffect, Suspense,useMemo } from "react";
import { useRouter } from "next/navigation";
import "../../styles/choices_page.css";
import OptionCard from "../../components/OptionCard";
import tasks_list from "../../data/tasks.json";
import Slider from "../../components/Slider";
import { useStateContext } from "../context/StateContext";

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

function ChoicePage() {
    const router = useRouter();
    const { state, setState } = useStateContext();
    const { taskType, taskId } = state;
    const [task, setTask] = useState<Task | null>(null);
    const [options, setOptions] = useState<Task["options"]>([]);
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [confidence, setConfidence] = useState(1);
    const [familiarity, setFamiliarity] = useState(1);
    const [loading, setLoading] = useState(true);
    const optionLabels = useMemo(() => ["A", "B", "C", "D"], []);

    // Restore state on refresh
    useEffect(() => {
        const savedState = localStorage.getItem("state");
        if (savedState) {
            setState((prev) => ({
                ...prev,
                ...JSON.parse(savedState),
            }));
        }
        setLoading(false);
    }, [setState]);

    // Load task data
    useEffect(() => {
        if (taskType && taskId && tasks_list[taskType as keyof typeof tasks_list]) {
            const taskList = tasks_list[taskType as keyof typeof tasks_list];
            const selectedTask = taskList.find((t) => t.task_id === Number(taskId));
            if (selectedTask) {
                setTask(selectedTask);

                // Shuffle options and store in state
                const shuffled = [...selectedTask.options].sort(() => Math.random() - 0.5);
                setOptions(shuffled);

                // Save shuffled options to global state
                setState((prev) => ({
                    ...prev,
                    options: shuffled,
                }));
            }
        } else if (!loading) {
            router.push("/tasks");
        }
    }, [taskType, taskId, setState, loading, router]);

    // Initialize scores
    useEffect(() => {
        if (options.length > 0) {
            const initialScores = Object.fromEntries(
                options.map((option) => [option.option_id, 1])
            );
            setScores(initialScores);
        }
    }, [options]);

    const handleScoreChange = (value: number, key: string) => {
        setScores((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        const sortedScores = Object.fromEntries(
            Object.entries(scores).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))

        );
        setState((prev) => ({
            ...prev,
            initialScores: {
                ...sortedScores,
                confidence,
                familiarity,
            },
        }));

        router.push("/chat");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!task) {
        return <div>Loading task...</div>;
    }

    return (
        <div className="initial-option-container">
            <h1 className="initial-option-task-title">{task.query.title.en}</h1>
            <h2 className="initial-option-task-desc">{task.query.desc.en}</h2>
            <p className="instruction-text">
                The following options show some ways to deal with this problem. Please read them carefully and make your
                preference score for each option. Please slide the slider to indicate your preference for each option.
            </p>
            <div className="initial-option-cards">
                {options.map((option, index) => (
                    <OptionCard
                        key={option.option_id}
                        title={`Option ${optionLabels[index]}`} // Fixed title (A, B, C, D)
                        description={option.desc?.en || "No description available"}
                        score={scores[option.option_id] || 1}
                        onScoreChange={(value) => handleScoreChange(value, option.option_id)}
                    />
                ))}
            </div>

            <div className="initial-option-sliders">
                <Slider
                    label="Confidence in the above scores"
                    value={confidence}
                    onChange={(newValue) => setConfidence(newValue)}
                />
                <Slider
                    label="Familiarity with the topic of this query"
                    value={familiarity}
                    onChange={(newValue) => setFamiliarity(newValue)}
                />
            </div>

            <button onClick={handleSubmit} className="initial-option-submit">
                Submit Preferences
            </button>
        </div>
    );
}

export default function ChoicePageWrapper() {
    return (
        <Suspense>
            <ChoicePage />
        </Suspense>
    );
}