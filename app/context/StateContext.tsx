"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Type for an individual option
interface Option {
    option_id: string;
    desc: {
        en: string;
        zh: string;
    };
    info: {};
}

// Type for initial scores
interface InitialScores {
    [key: string]: number; // Supports dynamic option keys
    confidence: number;
    familiarity: number;
}

// Application state type
interface AppState {
    taskType: string;
    taskId: string;
    userId: string;
    name: string;
    initialScores: InitialScores;
    options: Option[];
}

// Context props type
interface StateContextProps {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
}

// Default state
const defaultState: AppState = {
    taskType: "",
    taskId: "",
    userId: "",
    name: "",
    initialScores: { confidence: 1, familiarity: 1 },
    options: [],
};

const StateContext = createContext<StateContextProps | undefined>(undefined);

// StateProvider component
export const StateProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AppState>(() => {
        // Load state from localStorage if available
        if (typeof window !== "undefined") {
            const savedState = localStorage.getItem("state");
            return savedState ? JSON.parse(savedState) : defaultState;
        }
        return defaultState;
    });

    // Persist state to localStorage on state change
    useEffect(() => {
        localStorage.setItem("state", JSON.stringify(state));
    }, [state]);

    return (
        <StateContext.Provider value={{ state, setState }}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the state context
export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useStateContext must be used within a StateProvider");
    }
    return context;
};