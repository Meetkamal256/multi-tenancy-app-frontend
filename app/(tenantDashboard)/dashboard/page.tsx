"use client";

import styles from "./tenantDashboardHome.module.css";
import { FaUserFriends, FaChartLine, FaClipboardList } from "react-icons/fa";

const TenantDashboard = () => {
  const dummyStats = {
    subscription: "standard",
    dataUsage: "120GB",
    billingCycle: "monthly",
  };
  
  const recentActivities = [
    { id: 1, activity: "New client added", date: "2025-02-20" },
    { id: 2, activity: "Subscription upgraded", date: "2025-02-18" },
    { id: 3, activity: "Profile updated", date: "2025-02-16" },
  ];
  
  return (
    <div className="container">
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome Back, Tenant!</h1>
        <p className={styles.subtitle}>Here’s an overview of your account</p>
      </header>
      
      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <FaUserFriends className={styles.icon} />
          <h2>Billing Cycle</h2>
          <p>{dummyStats.billingCycle}</p>
        </div>
        <div className={styles.statCard}>
          <FaChartLine className={styles.icon} />
          <h2>Data Usage</h2>
          <p>{dummyStats.dataUsage}</p>
        </div>
        <div className={styles.statCard}>
          <FaClipboardList className={styles.icon} />
          <h2>Current Subscription</h2>
          <p>{dummyStats.subscription}</p>
        </div>
      </section>
      
      {/* Recent Activities */}
      <section className={styles.recentActivity}>
        <h2>Recent Activities</h2>
        <ul>
          {recentActivities.map((activity) => (
            <li key={activity.id}>
              <strong>{activity.activity}</strong> -{" "}
              {new Date(activity.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TenantDashboard;
