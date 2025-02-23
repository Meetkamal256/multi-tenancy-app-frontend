"use client";
import { useState } from "react";
import styles from "./tenantSidebar.module.css";
import { FaHome, FaUsers, FaChartBar, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const tenantSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <h2>Saas Tenant</h2>
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
              href="/profile"
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              <FaUsers className={styles.icon} /> Profile
            </Link>
          </li>
          <li>
            <Link
              href="/subscription"
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              <FaChartBar className={styles.icon} /> Subscription
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              <FaChartBar className={styles.icon} /> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default tenantSidebar;
