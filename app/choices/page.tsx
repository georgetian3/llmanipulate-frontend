"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import "../../styles/choices_page.css";
import OptionCard from "../../components/OptionCard";
import tasks_list from "../../data/tasks.json";
import Slider from "@/components/Slider";
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

// Function to generate a randomized taskDict
const generateRandomTaskDict = (options: string[]): Record<string, string> => {
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    const mapping: Record<string, string> = {};
    for (let i = 0; i < options.length; i++) {
        mapping[options[i]] = shuffled[i];
    }
    return mapping;
};

export function ChoicePage() {
    const router = useRouter();
    const { state, setState } = useStateContext(); // Use the global state
    const { taskType, taskId } = state;

    const [task, setTask] = useState<Task | null>(null);
    const [taskDict, setTaskDict] = useState<Record<string, string>>({});
    const [options, setOptions] = useState<Task["options"]>([]);
    const [scores, setScores] = useState<number[]>([]);
    const [confidence, setConfidence] = useState(1);
    const [familiarity, setFamiliarity] = useState(1);

    // Load task data from tasks_list and generate taskDict
    useEffect(() => {
        if (taskType && taskId && tasks_list[taskType]) {
            const taskList = tasks_list[taskType];
            const selectedTask = taskList.find((task: Task) => task.task_id === Number(taskId));
            if (selectedTask) {
                setTask(selectedTask);
                setOptions(selectedTask.options);

                // Generate the taskDict using the option IDs
                const optionIds = selectedTask.options.map((option) => option.option_id);
                const randomTaskDict = generateRandomTaskDict(optionIds);
                setTaskDict(randomTaskDict);

                // Save the mapping in the global state
                setState((prev) => ({
                    ...prev,
                    taskDict: randomTaskDict,
                }));
            }
        }
    }, [taskType, taskId]);

    // Initialize scores array
    useEffect(() => {
        if (options.length > 0) {
            setScores(Array(options.length).fill(1));
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
        // Remap scores to original order before saving
        const remappedScores = Object.entries(taskDict)
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .map(([, value]) => {
                const originalIndex = options.findIndex((option) => option.option_id === value);
                return scores[originalIndex];
            });

        // Update global state with initial scores
        setState((prev) => ({
            ...prev,
            initialScores: {
                scores: remappedScores,
                confidence,
                familiarity,
            },
        }));

        // Navigate to the chat page
        router.push("/chat");
    };

    if (!task) {
        return <div>Loading task...</div>;
    }

    // Map the randomized options to the correct descriptions
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
            </p>
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