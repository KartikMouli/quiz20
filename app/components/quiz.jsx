import React, { useState } from "react";
import ProgressBar from "./ProgressBar"; // Import ProgressBar
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const quizQuestions = [
    {
        question: "Which one of the following is used for manufacturing safety matches?",
        options: ["Di-phosphorus", "Black phosphorus", "Red phosphorus", "None of the above"],
        answer: "Red phosphorus",
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        answer: "Mitochondria",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: "Mars",
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        answer: "H2O",
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        answer: "Carbon Dioxide",
    },
];

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(null));
    const [statuses, setStatuses] = useState(Array(quizQuestions.length).fill(null));

    const handleNext = () => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(selectedAnswers[currentQuestion + 1]);
        }
        if (!selectedAnswer) {
            const newStatuses = [...statuses];
            newStatuses[currentQuestion] = 'skipped'; // Update status based on the selection
            setStatuses(newStatuses);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(selectedAnswers[currentQuestion - 1]);
        }

        if (!selectedAnswer) {
            const newStatuses = [...statuses];
            newStatuses[currentQuestion] = 'skipped'; // Update status based on the selection
            setStatuses(newStatuses);
        }
    };

    const handleAnswerSelection = (option) => {
        setSelectedAnswer(option);

        const newStatuses = [...statuses];
        newStatuses[currentQuestion] = 'solved'
        setStatuses(newStatuses);

        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestion] = option;
        setSelectedAnswers(newSelectedAnswers)

    };

    const handleCircleClick = (index) => {
        setCurrentQuestion(index);
        setSelectedAnswer(selectedAnswers[index]);
    };

    return (
        <div className="flex flex-col min-h-[90vh] p-2 mt-2">
            <div className="flex justify-between mt-2 px-2  items-center">
                <h2 className="text-xl font-semibold">Quiz by Quiz20</h2>
                <button className="text-sm bg-blue-500 text-white py-2 px-12 rounded-xl">
                    Submit
                </button>
            </div>

            {/* Progress Bar */}
            <ProgressBar
                questions={quizQuestions}
                currentQuestionIndex={currentQuestion}
                statuses={statuses} // Pass the statuses array to ProgressBar
                onCircleClick={handleCircleClick}
            />

            <div className="mt-6">
                <h2 className="mb-6 text-blue-400 text-md font-semibold">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                </h2>
                <p className="mb-6 font-semibold">{quizQuestions[currentQuestion].question}</p>

                <div className="flex flex-col space-y-2 w-full">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelection(option)}
                            className={`flex items-center p-2 rounded-lg ${selectedAnswer === option ? 'border-2 border-blue-500' : ''}`}
                        >
                            {/* Circle with the index (A, B, C, D) */}
                            <div className={`flex items-center justify-center w-9 h-9 mr-4 ${selectedAnswer === option ? 'bg-blue-500' : 'bg-gray-400'} text-white font-bold rounded-full`}>
                                {String.fromCharCode(65 + index)}
                            </div>
                            {/* Option Text */}
                            <span className="text-sm">{option}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white flex justify-center gap-x-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="text-sm flex justify-center gap-x-12 md:gap-x-40 p-5 items-center w-full bg-black/85 rounded-xl disabled:bg-black/40 text-gray-100"
                >
                    <FaChevronLeft size={13} /> Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentQuestion === quizQuestions.length - 1}
                    className="text-sm flex justify-center gap-x-12 md:gap-x-40 items-center p-5 w-full bg-black/85  rounded-xl disabled:bg-black/40 text-gray-100"
                >
                    Next <FaChevronRight size={13} />
                </button>
            </div>
        </div>
    );
}

export default Quiz;
