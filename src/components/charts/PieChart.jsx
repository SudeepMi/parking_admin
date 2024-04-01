/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ reservations }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Calculate the number of reservations for cars and bikes
  const carReservations = reservations.filter((reservation) => reservation?.vehicle?.vehicleType === "car").length ?? 5;
  const bikeReservations =
    reservations.filter((reservation) => reservation?.vehicle?.vehicleType === "bike").length ?? 5;

  const chartData = {
    labels: ["Car", "Bike"],
    datasets: [
      {
        data: [carReservations, bikeReservations],
        // backgroundColor: ["#FF5733", "#33FF57"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Reservations based on vehicle",
        color: "white",
        font: {
          size: 16,
        },
      },
    },
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the existing chart instance
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: chartData,
      options: chartOptions,
    });
  }, [reservations]); // Re-create the chart whenever the reservations change

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
