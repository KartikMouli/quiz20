import React, { useState } from 'react'
import DoughnutChart from './doughnutChart'
import { MdLeaderboard } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function Result() {

  const [score, setScore] = useState(4);
  const [correct, setCorrect] = useState(2);
  const [incorrect, setIncorrect] = useState(5);
  return (
    <div className="fixed inset-0 z-50 min-h-screen flex flex-col  p-2 bg-white">
      <h1 className='text-3xl p-2 mt-10 text-center'>Quiz by Quiz10</h1>
      <h2 className='text-3xl font-semibold mt-4 text-center'>Quiz20</h2>

      <div className="flex flex-col justify-center items-center p-2 mt-12">
        <DoughnutChart />
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-3 gap-2 px-8 text-sm font-semibold text-gray-600 my-4 text-center">
        <div>
          <p>Positive</p>
          <p className='font-bold mt-2'>{(correct * 1).toFixed(2)}</p>
        </div>
        <div>
          <p>Negative</p>
          <p className='font-bold mt-2'>{(-incorrect * 1).toFixed(2)}</p>
        </div>
        <div>
          <p>Total</p>
          <p className='font-bold mt-2'>{(correct - incorrect).toFixed(2)}</p>
        </div>
      </div>

      {/* Leaderboard Button */}
      <div className="flex justify-center p-2 mt-auto w-full">
        <button className="flex items-center justify-around bg-pink-600 text-white py-4 rounded-lg font-semibold w-full gap-2">
          LEADERBOARD <MdLeaderboard size={24} />
        </button>
      </div>

      {/* Share and Answers Buttons */}
      <div className="flex justify-center gap-2 p-2 mb-4 w-full">
        <button className="flex justify-around items-center py-4 w-full bg-black/85 rounded-xl text-gray-100 font-semibold">
          <IoMdShare size={24} /> Share
        </button>
        <button className="flex justify-around items-center py-4 w-full bg-black/85 rounded-xl text-gray-100 font-semibold">
          <MdOutlineRemoveRedEye size={24} /> Answers
        </button>
      </div>



    </div>
  )
}

export default Result