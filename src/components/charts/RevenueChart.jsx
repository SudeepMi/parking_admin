import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";

import ErrorComponent from "../ErrorComponent";
import { publicApi } from "../../api";
import Loading from "../Loading";

const RevenueChart = () => {
  const {
    data: spots,
    error,
    isLoading,
    isError,
  } = useQuery(["spots"], async () => {
    const response = await publicApi.get("spots");
    return response.data.spots;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent label="Parking Places" error={error} />;
  }

  const spotNames = spots.map((spot) => spot.name);
  const spotRevenues = spots.map((spot) => spot.revenue);

  const chartData = {
    labels: spotNames,
    color: "white",
    datasets: [
      {
        label: "Total Revenue",
        data: spotRevenues,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          color: "white",
          display: true,
          text: "Total Revenue",
          font: {
            size: 18, // Increase the font size for the y-axis title
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Parking Places",
          color: "white",
          font: {
            size: 18, // Increase the font size for the x-axis title
          },
        },
        ticks: {
          color: "rgb(203 213 225)",
          font: {
            size: 14, // Increase the font size for the x-axis tick labels (dates)
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "white",
          font: {
            size: 14, // Increase the font size for the legend labels
          },
        },
      },
      title: {
        display: true,
        text: "Total Revenue of Parking Places",
        color: "white",
        font: {
          size: 20, // Increase the font size for the chart title
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default RevenueChart;
