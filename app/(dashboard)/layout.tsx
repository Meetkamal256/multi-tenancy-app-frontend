import React, { ReactNode } from "react";
import styles from "./dashboardLayout.module.css";
import Sidebar from "../_components/sidebar/Sidebar";
import Header from "../_components/header/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SaaS Dashboard</title>
      </head>
      <body>
        <div className={styles.layoutContainer}>
          <div className={styles.menu}>
            <Sidebar />
          </div>
          <div className={styles.pageContent}>
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
