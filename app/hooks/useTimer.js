"use client"
import { useEffect } from 'react';

const useTimer = (
    timer,
    setTimer,
    showResultModal
) => {
    useEffect(() => {
        if (timer <= 0) {
            setTimer(0);
        }
    }, [timer, setTimer]);

    useEffect(() => {
        if (!showResultModal) {
            const countTimer = setTimeout(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearTimeout(countTimer);
        }
    }, [timer, setTimer]);
};

export default useTimer;