import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../Style/SalesDashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    axios
      .get("http://34.93.245.38/sale")
      .then((response) => setSalesData(response.data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  const createGraphData = (label, data) => ({
    labels: Array.from({ length: data.length }, () => ""),
    datasets: [
      {
        label,
        data,
        fill: true,
        backgroundColor: "rgba(173, 216, 230, 0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: () => "", // Hide tooltips
        },
      },
    },
    scales: {
      x: {
        display: false, // Hide the x-axis
      },
      y: {
        display: false, // Hide the y-axis
      },
    },
  };

  if (!salesData) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <div className="container">
       <div className="container-item">
       <p className="heading">Retaile</p>
        <p className="sales">Sales</p>
        <div className="percentage">
          <p>{salesData.retailerInfo.totalSales}</p>
          <p className="percentage-data">{salesData.retailerInfo.percentageDifference} %</p>
        </div>
       </div>
        <Line
          data={createGraphData(
            "Retailer Sales",
            salesData.retailerInfo.graphData
          )}
          options={chartOptions}
        />
      </div>

      <div className="container">
       <div className="container-item">
       <p className="heading">Key Account</p>
        <p className="sales">Sales</p>
        <div className="percentage">
        <p>{salesData.keyAccountInfo.totalSales}</p>
        <p className="percentage-data">{salesData.keyAccountInfo.percentageDifference} %</p>
        </div> 
       </div>
        <Line
          data={createGraphData(
            "Key Account Sales",
            salesData.keyAccountInfo.graphData
          )}
          options={chartOptions}
        />
      </div>

      <div className="container">
       <div className="container-item">
       <p className="heading ">Customer</p>
        <p className="sales">Sales</p>
        <div className="percentage">
        <p>{salesData.customerInfo.totalSales}</p>
        <p className="percentage-data">{salesData.customerInfo.percentageDifference} %</p>
        </div>
       </div>
        <Line
          data={createGraphData(
            "Customer Sales",
            salesData.customerInfo.graphData
          )}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default SalesDashboard;
