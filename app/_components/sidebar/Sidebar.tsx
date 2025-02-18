"use client";
import React from "react";
import styles from "./sidebar.module.css";
import { FaHome, FaUsers, FaChartBar } from "react-icons/fa";

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>SaaS Admin</h2>
      </div>

      <ul className={styles.menu}>
        <li>
          <a href="#" className={styles.menuItem}>
            <FaHome className={styles.icon} /> Dashboard
          </a>
        </li>
        <li>
          <a href="#" className={styles.menuItem}>
            <FaUsers className={styles.icon} /> Tenants
          </a>
        </li>
        <li>
          <a href="#" className={styles.menuItem}>
            <FaChartBar className={styles.icon} /> Analytics
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
