"use client"
import Timer from "./components/timer";
import Quiz from "./components/quiz";
import useTimer from "./hooks/useTimer";
import { useState } from "react";
import Result from "./components/result";

export default function Home() {

  const [timer, setTimer] = useState(1200);
  const [showResultModal, setShowResultModal] = useState(false)

  useTimer(timer, setTimer, showResultModal,setShowResultModal)

  return (
    <>
      <header className="flex justify-between items-center py-2 px-4 bg-black/85 text-white">
        <h1 className="text-3xl font-semibold ">Quiz20</h1>
        <Timer timer={timer} />
        <span>Theme</span>
      </header>
      <Quiz />

      {showResultModal && <Result />}
    </>
  );
}
