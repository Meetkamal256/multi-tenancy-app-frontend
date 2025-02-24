"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import styles from "./adminHeader.module.css";

// Extend JwtPayload to include custom fields
interface DecodedToken extends JwtPayload {
  name: string;
  email: string;
}

interface User {
  name: string;
  email: string;
}

const AdminHeader = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  // Wrap handleLogout in useCallback to avoid re-creation on every render
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    router.push("/login");
  }, [router]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.error("Token expired, logging out...");
          handleLogout();
        } else {
          // Prevent unnecessary state updates
          if (
            !user ||
            user.name !== decodedToken.name ||
            user.email !== decodedToken.email
          ) {
            setUser({
              name: decodedToken.name,
              email: decodedToken.email,
            });
          }
        }
      } catch {
        console.error("Invalid token, logging out...");
        handleLogout();
      }
    } else {
      router.push("/login");
    }
  }, [router, handleLogout, user]);
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {user && (
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
