"use client";
import React, { createContext, useContext, useState } from "react";
import questions from "../data/quizQuestions";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [timer, setTimer] = useState(1000);
    const [showResultModal, setShowResultModal] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [unattempted, setUnattempted] = useState(0);
    const [quizQuestions] = useState(questions); // Initialize once from data

    // Function to display result modal
    const handleShowResult = () => setShowResultModal(true);

    return (
        <QuizContext.Provider
            value={{
                timer,
                setTimer,
                showResultModal,
                handleShowResult,
                correct,
                setCorrect,
                incorrect,
                setIncorrect,
                unattempted,
                setUnattempted,
                quizQuestions,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

// Custom hook to access QuizContext
export const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }
    return context;
};
