"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
    taskType: string;
    taskId: string;
    userId: string;
    name: string;
    initialScores: any;
    taskDict: Record<string, string>;
}

interface StateContextProps {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const defaultState: AppState = {
    taskType: "",
    taskId: "",
    userId: "",
    name: "",
    initialScores: null,
    taskDict: {},
};

const StateContext = createContext<StateContextProps | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AppState>(defaultState);

    return (
        <StateContext.Provider value={{ state, setState }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useStateContext must be used within a StateProvider");
    }
    return context;
};