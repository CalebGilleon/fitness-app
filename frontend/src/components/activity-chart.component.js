// ActivityChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ActivityChart = ({ exercises }) => {
  const getLast10Days = () => {
    const days = [];
    for (let i = 9; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last10Days = getLast10Days();
  const activityData = last10Days.map(date => {
    const exercisesForDay = exercises.filter(exercise => exercise.date.startsWith(date));
    const totalDuration = exercisesForDay.reduce((total, exercise) => total + exercise.duration, 0);
    return {
      date,
      totalDuration,
      descriptions: exercisesForDay.map(exercise => exercise.description)
    };
  });

  const data = {
    labels: last10Days,
    datasets: [
      {
        label: 'Exercise Duration (mins)',
        data: activityData.map(dataPoint => dataPoint.totalDuration),
        fill: false,
        borderColor: '#0d6efd',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Activity over the Last 10 Days',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            const descriptions = activityData[index].descriptions;
            return [
              `Duration: ${context.raw} mins`,
              ...descriptions.map(desc => `Description: ${desc}`)
            ];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Duration (mins)',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ActivityChart;
