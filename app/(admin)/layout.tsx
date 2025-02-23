import React, { ReactNode } from "react";
import styles from "./adminDashboardLayout.module.css";
import AdminSidebar from "../_components/adminSidebar/AdminSidebar";
import AdminHeader from "../_components/AdminHeader/AdminHeader";


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SaaS Admin Dashboard</title>
      </head>
      <body>
        <div className={styles.layoutContainer}>
          <div className={styles.menu}>
            <AdminSidebar />
          </div>
          <div className={styles.pageContent}>
            <AdminHeader />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
