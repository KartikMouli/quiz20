"use client"
import React, { useState } from "react";


const quizQuestions = [
    {
        question: "Which one of the following is used for manufacturing safety matches?",
        options: ["Di-phosphorus", "Black phosphorus", "Red phosphorus", "None of the above"],
        answer: "Red phosphorus",
    },
    // Add more questions as needed
];

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleNext = () => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null); // Reset selected option
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedOption(null); // Reset selected option
        }
    };

    return (
        <div>

            <div className="flex justify-between p-2">
                <h1>Quiz by Quiz20</h1>
                <button>Submit</button>
            </div>

            <div >
                <h2 className="text-xl">Question {currentQuestion + 1} of {quizQuestions.length}</h2>
                <p>
                    {quizQuestions[currentQuestion].question}
                </p>

                <div className="flex flex-col">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedOption(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentQuestion === quizQuestions.length - 1}
                >
                    Next
                </button>
            </div>

        </div>
    );
}

export default Quiz;
