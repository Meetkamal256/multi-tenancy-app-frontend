"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { tenantsData } from "../../data";

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const AnalyticsChart = () => {
  // Group tenants by year of creation and calculate total data usage for each year
  const dataByYear = tenantsData
    .filter((tenant) => tenant.active) // Filter only active tenants
    .reduce((acc, tenant) => {
      const year = new Date(tenant.creationDate).getFullYear();
      if (!acc[year]) acc[year] = 0;
      acc[year] += tenant.dataUsage;
      return acc;
    }, {} as { [key: number]: number });

  const years = Object.keys(dataByYear).map((year) => parseInt(year));
  const totalDataUsage = years.map((year) => dataByYear[year]);

  // Chart data
  const data = {
    labels: years,
    datasets: [
      {
        label: "Total Data Usage of Active Tenants",
        data: totalDataUsage,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Chart options with responsiveness adjustments
  const options = {
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Allow aspect ratio to adjust based on container size
    plugins: {
      title: {
        display: true,
        text: "Total Data Usage by Active Tenants per Year",
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Ensure the x-axis starts at 0 for consistency
      },
      y: {
        beginAtZero: true, // Ensure the y-axis starts at 0
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "400px" }}>
      {/* Dynamically set the height based on the screen size */}
      <Line data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;
