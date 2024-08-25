// src/OrderValueChart.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../Style/OrderValueChart.css";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const OrderValueChart = () => {
  const [data, setData] = useState(null);
  const [selectedData, setSelectedData] = useState("current");

  useEffect(() => {
    fetch("http://34.93.245.38/order-value")
      .then((response) => response.json())
      .then((data) => setData(data.averageOrderValueInfo));
  }, []);

  if (!data) return <p>Loading...</p>;

  const labels = [
    data.fromDate,
    "Oct 16th",
    "Oct 17th",
    "Oct 18th",
    "Oct 19th",
    "Oct 20th",
    "Oct 21st",
    data.toDate,
  ];

  const currentData = data.graphData.current;
  const previousData = data.graphData.previous;

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: selectedData === "current" ? currentData : previousData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
        legend: {
          display: false, // Hide the legend
        },
      },
    scales: {
      x: {
        ticks: {
          callback: (value, index, values) => {
            return index === 0 || index === values.length - 1
              ? labels[index]
              : "";
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value) => {
            return value.toLocaleString();
          },
          stepSize: 100000,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="order-value-chart">
      <p className="heading">Order Value Chart</p>
      <div className="conatiner-item-order">
        <div className="total-data">
            <p className="total">{data.total}</p>
            <p className="percentage-data">{data.percentageDifference}</p>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="data-type"
              value="current"
              checked={selectedData === "current"}
              onChange={() => setSelectedData("current")}
            />
            Current
          </label>
          <label>
            <input
              type="radio"
              name="data-type"
              value="previous"
              checked={selectedData === "previous"}
              onChange={() => setSelectedData("previous")}
            />
            Previous
          </label>
        </div>
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default OrderValueChart;
