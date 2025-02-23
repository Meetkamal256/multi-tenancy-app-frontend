"use client";
import React, { useState } from "react";
import styles from "./settings.module.css";

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="container">
      <h1 className={styles.title}>Settings</h1>

      {/* Account Settings */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Account Settings</h2>
        <form className={styles.form}>
          <label className={styles.label}>
            Tenant Name
            <input
              type="text"
              className={styles.input}
              placeholder="Enter tenant name"
            />
          </label>

          <label className={styles.label}>
            Email
            <input
              type="email"
              className={styles.input}
              placeholder="Enter email"
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              type="password"
              className={styles.input}
              placeholder="Enter new password"
            />
          </label>

          <button type="submit" className={styles.saveButton}>
            Save Changes
          </button>
        </form>
      </section>

      {/* Notification Settings */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Notification Preferences</h2>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          Enable Email Notifications
        </label>
      </section>

      {/* Security Settings */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Security Settings</h2>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={twoFactorEnabled}
            onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
          />
          Enable Two-Factor Authentication
        </label>
      </section>
    </div>
  );
};

export default SettingsPage;
