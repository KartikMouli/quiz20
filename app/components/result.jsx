import React from 'react'
import ResultChart from './doughnutChart'
import DoughnutChart from './doughnutChart'

function Result() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-2 bg-white">
      <h1>Quiz by Quiz10</h1>
      <h2>Quiz20</h2>
      <div className="flex flex-col justify-center items-center">
        <DoughnutChart />
      </div>

    </div>
  )
}

export default Result