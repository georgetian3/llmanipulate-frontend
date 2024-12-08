"use client";

import { useState, useEffect, Suspense } from "react";
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

const generateRandomTaskDict = (options: string[]): Record<string, string> => {
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    const mapping: Record<string, string> = {};
    options.forEach((option, i) => {
        mapping[option] = shuffled[i];
    });
    return mapping;
};

function ChoicePage() {
    const router = useRouter();
    const { state, setState } = useStateContext();
    const { taskType, taskId, taskDict } = state;
    const [task, setTask] = useState<Task | null>(null);
    const [options, setOptions] = useState<{ option_id: string; desc: { en: string; zh: string }; info: {} }[]>([]);
    const [scores, setScores] = useState<number[]>([]);
    const [confidence, setConfidence] = useState(1);
    const [familiarity, setFamiliarity] = useState(1);
    const [loading, setLoading] = useState(true); // Loading state for restoration

    // Restore state on refresh
    useEffect(() => {
        const savedState = localStorage.getItem("state");
        if (savedState) {
            setState((prev) => ({
                ...prev,
                ...JSON.parse(savedState),
            }));
        }
        setLoading(false); // Mark restoration as complete
    }, [setState]);

    // Load task data and initialize taskDict
    useEffect(() => {
        if (taskType && taskId && tasks_list[taskType as keyof typeof tasks_list]) {
            const taskList = tasks_list[taskType as keyof typeof tasks_list];
            const selectedTask = taskList.find((t) => t.task_id === Number(taskId));
            if (selectedTask) {
                setTask(selectedTask);
                setOptions(selectedTask.options);

                if (!taskDict || Object.keys(taskDict).length === 0) {
                    const optionIds = selectedTask.options.map((o) => o.option_id);
                    const randomDict = generateRandomTaskDict(optionIds);
                    setState((prev) => ({
                        ...prev,
                        taskDict: randomDict,
                    }));
                }
            }
        } else if (!loading) {
            router.push("/tasks"); // Redirect if taskType or taskId is missing
        }
    }, [taskType, taskId, taskDict, setState, loading, router]);

    // Initialize scores
    useEffect(() => {
        if (options.length > 0) {
            setScores(Array(options.length).fill(1));
        }
    }, [options]);

    const handleScoreChange = (value: number, index: number) => {
        setScores((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const handleSubmit = () => {
        const remappedScores = Object.entries(taskDict)
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .map(([, value]) => {
                const originalIndex = options.findIndex((o) => o.option_id === value);
                return scores[originalIndex];
            });

        setState((prev) => ({
            ...prev,
            initialScores: {
                scores: remappedScores,
                confidence,
                familiarity,
            },
        }));

        router.push("/chat");
    };

    if (loading) {
        return <div>Loading...</div>; // Show a general loading state during restoration
    }

    if (!task) {
        return <div>Loading task...</div>;
    }

    const remappedOptions = options.map((option) => ({
        ...option,
        desc: options.find((o) => o.option_id === taskDict[option.option_id])?.desc || option.desc,
    }));

    return (
        <div className="initial-option-container">
            <h1 className="initial-option-task-title">{task.query.title.en}</h1>
            <h2 className="initial-option-task-desc">{task.query.desc.en}</h2>
            <p className="instruction-text">
                The following options show some ways to deal with this problem. Please
                read them carefully and make your preference score for each option.
                Please slide the slider to indicate your preference for each option.
            </p >
            <div className="initial-option-cards">
                {remappedOptions.map((option, index) => (
                    <OptionCard
                        key={option.option_id || index}
                        title={option.option_id}
                        description={option.desc.en}
                        score={scores[index] || 1}
                        onScoreChange={(value) => handleScoreChange(value, index)}
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