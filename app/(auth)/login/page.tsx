"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import styles from "./login.module.css";
import SignupForm from "../../_components/signupForm/SignupForm";

const AuthFormWrapper = () => {
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

        {activeTab === "login" ? <LoginFormContent /> : <SignupForm />}
      </div>
    </div>
  );
};

const LoginFormContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.error || "Login failed");
      } else {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setEmail("");
        setPassword("");
        setErrors({});
        
       setTimeout(() => {
         if (data.user.role === "admin") {
           router.push("/admin");
         } else if (data.user.role === "tenant") {
           router.push("/tenant");
         } else {
           toast.error("Invalid user role");
         }
       }, 1000);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case "email":
        setEmail(value);
        if (errors.email && value)
          setErrors((prev) => ({ ...prev, email: "" }));
        break;
      case "password":
        setPassword(value);
        if (errors.password && value)
          setErrors((prev) => ({ ...prev, password: "" }));
        break;
    }
  };
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </>
  );
};

export default AuthFormWrapper;
