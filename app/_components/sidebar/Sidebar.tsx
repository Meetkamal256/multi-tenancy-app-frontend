"use client";
import { useState } from "react";
import styles from "./sidebar.module.css";
import { FaHome, FaUsers, FaChartBar, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link"; // Import Link component from Next.js

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
            <Link
              href="/dashboard"
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              <FaHome className={styles.icon} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/tenants"
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              <FaUsers className={styles.icon} /> Tenants
            </Link>
          </li>
          <li>
            <Link
              href="/analytics"
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              <FaChartBar className={styles.icon} /> Analytics
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
