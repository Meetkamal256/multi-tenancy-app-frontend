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
                                                                                                                                                Legend,
                                                                                                                                                } from "chart.js";
                                                                                                                                                import { tenantsData } from "../../data"

                                                                                                                                                // Register required chart components
                                                                                                                                                ChartJS.register(
                                                                                                                                                CategoryScale,
                                                                                                                                                LinearScale,
                                                                                                                                                PointElement,
                                                                                                                                                LineElement,
                                                                                                                                                Title,
                                                                                                                                                Tooltip,
                                                                                                                                                Legend
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
                                                                                                                                                
                                                                                                                                                // Chart options
                                                                                                                                                const options = {
                                                                                                                                                    responsive: true,
                                                                                                                                                    plugins: {
                                                                                                                                                    legend: {
                                                                                                                                                        position: "top",
                                                                                                                                                    },
                                                                                                                                                    title: {
                                                                                                                                                        display: true,
                                                                                                                                                        text: "Total Data Usage by Active Tenants per Year",
                                                                                                                                                    },
                                                                                                                                                    },
                                                                                                                                                };
                                                                                                                                                
                                                                                                                                                return <Line data={data} options={options} />;
                                                                                                                                                };

                                                                                                                                                export default AnalyticsChart;
