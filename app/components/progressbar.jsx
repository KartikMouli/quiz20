import { TailSpin } from "react-loader-spinner";
import { FaCheck } from "react-icons/fa6";



const ProgressBar = ({ questions, currentQuestionIndex, statuses, onCircleClick }) => {


    return (
        <div className="p-2 mt-4 mb-2 flex items-center">
            {questions.map((_, index) => (
                <div key={index} className="flex items-center">
                    {/* Circle for each question */}
                    <div
                        onClick={() => onCircleClick(index)}
                        className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors
                            ${index === currentQuestionIndex
                                ? 'bg-green-500' // Show blue if it's the current question
                                : statuses[index] === 'solved'
                                    ? 'bg-blue-500' // Show green if the question is solved
                                    : statuses[index] === 'skipped'
                                        ? 'bg-yellow-500' // Show yellow if the question is skipped
                                        : 'bg-gray-300' // Default gray for other statuses
                            }`}
                    >
                        {index === currentQuestionIndex ? (
                            <TailSpin
                                visible={true}
                                height="20"
                                width="20"
                                color="#ffffff" // White spinner color
                                ariaLabel="tail-spin-loading"
                                radius="1"
                            />
                        ) :
                            statuses[index] === 'solved'
                                ? (<FaCheck className="text-white" />)
                                : (
                                    <div className="flex items-center justify-center w-3 h-3 rounded-full bg-white" />
                                )
                        }
                    </div>
                    {/* Connector line */}
                    {index < questions.length - 1 && (
                        <div className="w-8 h-1 bg-gray-300" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
