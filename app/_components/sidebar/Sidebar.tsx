"use client";
import { useState } from "react";
import styles from "./sidebar.module.css";
import { FaHome, FaUsers, FaChartBar, FaBars, FaTimes } from "react-icons/fa";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
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
            <a href="/tenants" className={styles.menuItem}>
              <FaUsers className={styles.icon} /> Tenants
            </a>
          </li>
          <li>
            <a href="/analytics" className={styles.menuItem}>
              <FaChartBar className={styles.icon} /> Analytics
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
