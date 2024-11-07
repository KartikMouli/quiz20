// utility function to format the remaining time as minutes:seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function Timer({timer}) {
    console.log(timer)
    return (
        <div className="bg-white py-1 px-4 text-black text-3xl font-semibold rounded-full">
            {formatTime(timer)}
        </div>
    );
}

export default Timer;
