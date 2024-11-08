import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useQuizContext } from '../context/quizContext';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const DoughnutChart = ({ total }) => {
    const { correct, incorrect, unattempted } = useQuizContext();

    // Chart data and configuration
    const data = {
        labels: ['Correct', 'Incorrect', 'Not Attempted'],
        datasets: [
            {
                data: [correct, incorrect, unattempted],
                backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'],
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
            datalabels: {
                display: false, // Hide segment labels
            },
        },
    };

    // Custom plugin to render score in the center of the chart
    const textCenterPlugin = {
        id: 'textCenter',
        beforeDraw(chart) {
            const { ctx, chartArea: { top, bottom, left, right } } = chart;
            const centerX = (left + right) / 2;
            const centerY = (top + bottom) / 2;

            ctx.save();
            ctx.font = '16px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Score: ${total}`, centerX, centerY);
            ctx.restore();
        },
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-64 h-64 md:h-96 md:w-96" >
                <Doughnut data={data} options={options} plugins={[textCenterPlugin]} />
            </div>
        </div>
    );
};

export default DoughnutChart;
