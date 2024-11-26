type UserDatabase = {
    [key: string]: {
        name: string;
        taskType: string;
        language: string;
        agentType: string;
    };
}; 

const userDatabase: UserDatabase = {
    "abcdef": {
        name: "Alice",
        taskType: "Financial",
        language: "en",
        agentType: "control",
    },
    
    "qwerty": {
        name: "Bob",
        taskType: "Emotional",
        language: "zh",
        agentType: "experimental",
    }
}

export const fetchUserData = (usercode: string) => {
    if (usercode in userDatabase) {
        return userDatabase[usercode];
    }
    return undefined;
};