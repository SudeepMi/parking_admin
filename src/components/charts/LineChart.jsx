/* eslint-disable react/prop-types */

import { Line } from "react-chartjs-2";
import moment from "moment";

const LineChart = ({ reservations }) => {
  const reservationDates = reservations.map((reservation) => moment(reservation.createdAt));
  const reservationCounts = Array.from({ length: reservationDates.length }, (_, i) => i + 1);

  const chartData = {
    labels: reservationDates.map((date) => date.format("MMM D")),
    datasets: [
      {
        label: "Reservations over time",
        data: reservationCounts,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Reservations Over Time",
        color: "white",
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
