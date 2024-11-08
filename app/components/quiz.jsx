import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import SubmitModal from "./submitModal";
import { useQuizContext } from "../context/quizContext";
import axios from "axios";
import { MdGTranslate } from "react-icons/md";

function Quiz() {
    const { setCorrect, setIncorrect, setUnattempted, handleShowResult, quizQuestions, showResultModal } = useQuizContext();

    // Handle loading state for quiz questions
    if (!quizQuestions || quizQuestions.length === 0) {
        return <div>Loading...</div>;
    }

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(null));
    const [statuses, setStatuses] = useState(Array(quizQuestions.length).fill(null));
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [translatedQuestions, setTranslatedQuestions] = useState([])
    const [isTranslated, setIsTranslated] = useState(false);

    const translateText = async (text, targetLang) => {
        try {
            const response = await axios.post('/api/translate', {
                text: text,
                targetLang: targetLang,
            });

            console.log("client: ", response)

            return response.data.data.translations[0].translatedText;
        } catch (error) {
            console.error("Translation error:", error);
            return text; // Return original text if translation fails
        }
    };

    const translateQuestionsToHindi = async () => {
        try {
            const translatedQuestions = await Promise.all(quizQuestions.map(async (question) => {
                const translatedQuestion = await translateText(question.question, "hi");
                const translatedOptions = await Promise.all(
                    question.options.map(async (option) => {
                        return await translateText(option, "hi");
                    })
                );
                const translatedAnswer = await translateText(question.answer, "hi");
                return {
                    ...question,
                    question: translatedQuestion,
                    options: translatedOptions,
                    answer: translatedAnswer,
                };
            }));

            setTranslatedQuestions(translatedQuestions);
        } catch (error) {
            console.error("Error in translating questions:", error);

        }
    };

    useEffect(() => {
        translateQuestionsToHindi()
    }, [])


    // Calculate quiz results based on answers
    const calculateResults = () => {
        let correct = 0;
        let incorrect = 0;
        let unattempted = 0;

        selectedAnswers.forEach((isCorrect) => {
            if (isCorrect === null) unattempted++;
            else if (isCorrect) correct++;
            else incorrect++;
        });

        setCorrect(correct);
        setIncorrect(incorrect);
        setUnattempted(unattempted);
    };

    // Handle navigation between questions
    const navigateQuestion = (direction) => {
        const newQuestionIndex = currentQuestion + direction;
        setCurrentQuestion(newQuestionIndex);
        setSelectedAnswer(selectedAnswers[newQuestionIndex]);

        if (!selectedAnswer && statuses[currentQuestion] !== 'solved') {
            setStatuses((prev) => {
                const updatedStatuses = [...prev];
                updatedStatuses[currentQuestion] = 'skipped';
                return updatedStatuses;
            });
        }
        calculateResults();
    };

    const handleAnswerSelection = (option) => {
        const correctAnswer = quizQuestions[currentQuestion].answer;

        setSelectedAnswer(option);
        setSelectedAnswers((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuestion] = option === correctAnswer;
            return updatedAnswers;
        });

        setStatuses((prev) => {
            const updatedStatuses = [...prev];
            updatedStatuses[currentQuestion] = 'solved';
            return updatedStatuses;
        });

        calculateResults();
    };

    // Open and close submit modal
    const handleOpenSubmitModal = () => {
        calculateResults();
        setShowSubmitModal(true);
    };
    const handleCloseSubmitModal = () => setShowSubmitModal(false);


    useEffect(() => {
        calculateResults()
    }, [selectedAnswers, currentQuestion])

    // Toggle translation function
    const toggleTranslation = () => {
        setIsTranslated((prev) => !prev); // Toggle between original and translated questions
    };


    const currentQuestionData = isTranslated ? translatedQuestions[currentQuestion] : quizQuestions[currentQuestion];


    return (
        <>
            <div className="flex flex-col p-2 mt-2">
                <div className="flex justify-between mt-2 px-2 items-center">
                    <h2 className="text-xl font-semibold">Quiz by Quiz20</h2>
                    <button
                        className="text-sm bg-[#2196f3] text-white py-2 px-12 md:min-w-96 rounded-xl font-semibold"
                        onClick={handleOpenSubmitModal}
                    >
                        Submit
                    </button>
                </div>

                {/* Progress Bar */}
                <ProgressBar
                    questions={isTranslated ? translatedQuestions : quizQuestions}
                    currentQuestionIndex={currentQuestion}
                    statuses={statuses}
                    onCircleClick={(index) => {
                        calculateResults();
                        setCurrentQuestion(index);
                        setSelectedAnswer(selectedAnswers[index]);
                    }}
                />

                <div className="mt-6 overflow-y-auto">
                    <div className="flex justify-between align-center ">
                        <h2 className="mb-6 text-blue-400 text-md font-semibold">
                            Question {currentQuestion + 1} of {isTranslated ? translatedQuestions.length : quizQuestions.length}
                        </h2>
                        <button
                            className={`py-1 px-4 ${isTranslated ? "text-blue-500" : "text-black"} `}
                            onClick={toggleTranslation}
                        >
                            <MdGTranslate size={24} />
                        </button>
                    </div>

                    <p className="mb-6 text-sm md:text-md font-semibold">{currentQuestionData?.question}</p>

                    <div className="flex flex-col space-y-2 w-full">
                        {currentQuestionData?.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelection(option)}
                                className={`flex items-center p-2 rounded-lg ${selectedAnswer === option ? 'border-2 border-[#2196f3]' : ''}`}
                            >
                                <div className={`flex items-center justify-center w-9 h-9 mr-4 ${selectedAnswer === option ? 'bg-[#2196f3]' : 'bg-[#9e9e9e]'} text-white font-bold rounded-full`}>
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <span className="text-xs md:text-sm">{option}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center gap-x-2">
                    <button
                        onClick={() => navigateQuestion(-1)}
                        disabled={currentQuestion === 0}
                        className="flex justify-around items-center py-4 w-full bg-black/85 rounded-xl disabled:bg-black/40 text-gray-100 font-semibold"
                    >
                        <FaChevronLeft size={13} /> Previous
                    </button>
                    <button
                        onClick={() => navigateQuestion(1)}
                        disabled={currentQuestion === (isTranslated ? translatedQuestions.length - 1 : quizQuestions.length - 1)}
                        className="flex justify-around items-center py-4 w-full bg-black/85 rounded-xl disabled:bg-black/40 text-gray-100 font-semibold"
                    >
                        Next <FaChevronRight size={13} />
                    </button>
                </div>
            </div>

            <SubmitModal
                isOpen={showSubmitModal}
                onClose={handleCloseSubmitModal}
                showResult={handleShowResult}
                unattempted={selectedAnswers.filter((answer) => answer === null).length}
            />
        </>
    );
}

export default Quiz;
