import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ protein, fat, carbs }) {
  const [proteinPercentage, setProteinPercentage] = useState(0);
  const [fatPercentage, setFatPercentage] = useState(0);
  const [carbsPercentage, setCarbsPercentage] = useState(0);

  useEffect(() => {
    let sum = protein + fat + carbs;
    setProteinPercentage(100 / (sum / protein));
    setFatPercentage(100 / (sum / fat));
    setCarbsPercentage(100 / (sum / carbs));
  }, [protein, fat, carbs])

  const data = {
    labels: ['Protein', 'Fat', 'Net Carbs'],
    datasets: [
      {
        label: '%',
        data: [proteinPercentage.toFixed(1), fatPercentage.toFixed(1), carbsPercentage.toFixed(1)],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
