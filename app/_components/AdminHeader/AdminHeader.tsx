"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import styles from "./adminHeader.module.css";

interface User {
  name: string;
  email: string;
}

const AdminHeader = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUser({
          name: decodedToken.name,
          email: decodedToken.email,
        });
      } catch (error) {
        console.error("Invalid token, logging out...");
        handleLogout();
      }
    } else {
      router.push("/login");
    }
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    router.push("/login"); 
  };
  
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
