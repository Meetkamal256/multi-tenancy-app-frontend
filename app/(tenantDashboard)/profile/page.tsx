"use client";
import { useState } from "react";
import styles from "./profile.module.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    company: "SaaS Tenant Inc.",
    phone: "+1 234 567 890",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // Placeholder for save logic
    console.log("Profile updated:", profile);
  };
  
  return (
    <div className="container">
      <h1 className={styles.title}>Profile</h1>
      
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
  
        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSave}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
