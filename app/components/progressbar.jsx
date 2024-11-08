import { TailSpin } from "react-loader-spinner";
import { FaCheck } from "react-icons/fa6";

const ProgressBar = ({ questions, currentQuestionIndex, statuses, onCircleClick }) => {
    const getCircleColor = (index) => {
        if (index === currentQuestionIndex) return 'bg-[#5ec792]';
        if (statuses[index] === 'solved') return 'bg-[#2196f3]';
        if (statuses[index] === 'skipped') return 'bg-[#ffab40]';
        return 'bg-gray-300';
    };

    const getTextColor = (index) => {
        if (index === currentQuestionIndex) return 'text-[#5ec792]';
        if (statuses[index] === 'solved') return 'text-[#2196f3]';
        if (statuses[index] === 'skipped') return 'text-[#ffab40]';
        return 'text-gray-300';
    };

    return (
        <div className="p-2 mt-4 mb-2 flex flex-wrap items-center">
            {questions.map((_, index) => (
                <div key={index} className="flex items-center">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center">
                            <div
                                onClick={() => onCircleClick(index)}
                                className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors ${getCircleColor(index)}`}
                            >
                                {index === currentQuestionIndex ? (
                                    <TailSpin visible={true} height="20" width="20" color="#ffffff" ariaLabel="tail-spin-loading" radius="1" />
                                ) : statuses[index] === 'solved' ? (
                                    <FaCheck className="text-white" />
                                ) : (
                                    <div className="flex items-center justify-center w-3 h-3 rounded-full bg-white" />
                                )}
                            </div>
                            {index < questions.length - 1 && (
                                <div className="w-8 h-1 bg-gray-300" />
                            )}
                        </div>
                        <span className={`px-3 text-xs font-semibold ${getTextColor(index)}`}>
                            {index + 1}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
