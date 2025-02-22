"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import SignupForm from "../_components/signupForm/SignupForm";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.tab}>
          <div
            className={`${styles.tabItem} ${
              activeTab === "login" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </div>
          <div
            className={`${styles.tabItem} ${
              activeTab === "signup" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </div>
        </div>
        
        {/* Dynamically load the form */}
        {activeTab === "login" ? <LoginFormContent /> : <SignupForm />}
      </div>
    </div>
  );
};

const LoginFormContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted", { email, password });
  };
  
  return (
    <>
      <h1 className={styles.sectionHeading}>Welcome back</h1>
      <p className={styles.sectionParagraph}>
        Let's get back to managing your clients
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
      
    </>
  );
};

export default LoginForm;
