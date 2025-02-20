"use client";
import React, { useEffect, useState } from "react";
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

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const API_URL = "http://localhost:5000/tenants"; 

const AnalyticsChart = () => {
  const [tenants, setTenants] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  
  // Fetch tenants data
  const fetchTenantsData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch tenants data");
      }
      const data: any[] = await response.json(); 
      setTenants(data); 
      setIsLoading(false); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); 
      } else {
        setError("An unknown error occurred");
      }
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTenantsData();
  }, []);
  
  if (isLoading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error}</div>; 
  
  // Group tenants by year of creation and calculate total data usage for each year
  const dataByYear = tenants
    .filter((tenant) => tenant.isActive) 
    .reduce((acc, tenant) => {
      const year = new Date(tenant.createdAt).getFullYear(); 
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
    responsive: true, 
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Total Data Usage by Active Tenants per Year",
      },
    },
    scales: {
      x: {
        beginAtZero: true, 
      },
      y: {
        beginAtZero: true, 
      },
    },
  };
  
  return (
    <div style={{ position: "relative", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;
