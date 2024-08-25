import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "../Style/RevenueChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    axios
      .get("http://34.93.245.38/revenue")
      .then((response) => setRevenueData(response.data))
      .catch((error) => console.error("Error fetching revenue data:", error));
  }, []);

  const createBarData = (data) => {
    const months = data.map((item) => item.month);
    const direct = data.map((item) => item.direct);
    const indirect = data.map((item) => item.indirect);

    return {
      labels: months,
      datasets: [
        {
          label: "Direct Revenue",
          data: direct,
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
        {
          label: "Indirect Revenue",
          data: indirect,
          backgroundColor: "rgba(153,102,255,0.6)",
          borderColor: "rgba(153,102,255,1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${(context.raw / 100000).toFixed(
              0
            )} L`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          display: false, // Hide the grid lines on the x-axis
        },
        ticks: {
          callback: function (value, index, values) {
            // Customize x-axis tick labels
            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            return months[value] || ""; // Return month name or empty if index is out of bounds
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue",
        },
        grid: {
          display: false, // Hide the grid lines on the y-axis
        },
        ticks: {
          callback: function (value) {
            // Customize y-axis tick labels
            return `${(value / 100000).toFixed(0)}L`; // Convert value to 'L' format
          },
        },
      },
    },
  };

  const formatToCrores = (amount) => {
    return (amount / 10000000).toFixed(2) + " Cr";
  };
  if (!revenueData) return <div>Loading...</div>;

  return (
    <div className="revenue-chart">
      <p className="heading-top">Direct vs Indirect Revenue</p>
     <div className="data-item">
     <div className="heading-data">
        <span>
          {formatToCrores(revenueData.directIndirectInfo.totalSalesDirect)}
        </span>
        <span className="title">Direct</span>
      </div>

      <div className="heading-data">
        <span>
          {formatToCrores(revenueData.directIndirectInfo.totalSalesIndirect)}
        </span>
        <span className="title">Indirect</span>
      </div>
     </div>
      <Bar
        data={createBarData(revenueData.directIndirectInfo.graphData)}
        options={barOptions}
      />
    </div>
  );
};

export default RevenueChart;
