import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const DoughnutChart = () => {
    const data = {
        labels: ['Correct', 'Incorrect', 'Not Attempted'],
        datasets: [
            {
                data: [75, 20, 5],  // Example data, modify as needed
                backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'],  // Green, Red, Yellow
                // borderColor: ['#4CAF50', '#F44336', '#FFEB3B'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-72 h-72">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default DoughnutChart;
