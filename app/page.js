"use client"
import Timer from "./components/timer";
import Quiz from "./components/quiz";
import useTimer from "./hooks/useTimer";
import { useState } from "react";

export default function Home() {

  const [timer, setTimer] = useState(60);
  const [showResultModal, setShowResultModal] = useState(false)

  useTimer(timer, setTimer, showResultModal)

  return (
    <>
      <header className="flex justify-between items-center py-2 px-4 bg-black text-white">
        <h1 className="text-2xl font-bold ">Quiz20</h1>
        <Timer timer={timer} />
        <span>Theme</span>
      </header>
      <Quiz />
    </>
  );
}
