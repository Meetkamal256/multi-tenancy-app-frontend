"use client";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import styles from "./adminDashboardHome.module.css";

interface TenantActivity {
  id: string;
  name: string;
  createdAt: string;
}

export default function Home() {
  const [stats, setStats] = useState({
    tenants: 0,
    activeSubscriptions: 0,
  });
  const [recentActivity, setRecentActivity] = useState<TenantActivity[]>([]);
  
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("token");
        console.log("Stored Token:", token);
        
        const response = await fetch("http://localhost:5000/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("Response Status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard data: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Full Dashboard Data:", data);
        
        if (data) {
          setStats({
            tenants: data.tenants || 0,
            activeSubscriptions: data.activeSubscriptions || 0,
          });
        } else {
          console.warn("Stats data is missing from the response");
        }
        
        setRecentActivity(data.recentActivity || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    }
    
    fetchDashboardData();
  }, []);
  
  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to the Admin Dashboard</h1>
        <p className={styles.subtitle}>
          Manage tenants, view analytics, and customize settings
        </p>
      </header>
      
      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <h2>
            <FaUsers /> Total Tenants
          </h2>
          <p>{stats.tenants}</p>
        </div>
        <div className={styles.statCard}>
          <h2>
            <MdSubscriptions /> Active Subscriptions
          </h2>
          <p>{stats.activeSubscriptions}</p>
        </div>
      </section>
      
      <section className={styles.recentActivity}>
        <h2>
          <AiOutlineClockCircle /> Recent Activity
        </h2>
        <ul>
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <li key={activity.id}>
                <strong>{activity.name}</strong> joined on{" "}
                {new Date(activity.createdAt).toLocaleDateString()}
              </li>
            ))
          ) : (
            <li>No recent activity</li>
          )}
        </ul>
      </section>
    </div>
  );
}
