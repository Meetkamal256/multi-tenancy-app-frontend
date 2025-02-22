import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./signupForm.module.css";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form field
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
      
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.error || "Registration failed");
      } else {
        toast.success("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  // Clear errors dynamically as the user types valid input
  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value);
        if (errors.name && value) setErrors((prev) => ({ ...prev, name: "" }));
        break;
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
      case "confirmPassword":
        setConfirmPassword(value);
        if (errors.confirmPassword && value)
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        break;
    }
  };
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className={styles.sectionHeading}>Create an Account</h1>
      <p className={styles.sectionParagraph}>
        Start managing your clients more effectively
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
        
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
        </div>
        
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignupForm;
