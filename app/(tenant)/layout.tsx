import React, { ReactNode } from "react";
import styles from "./dashboardLayout.module.css";
import TenantHeader from "../_components/tenantHeader/TenantHeader";
import TenantSidebar from "../_components/tenantSidebar/TenantSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TenantDashboard</title>
      </head>
      <body>
        <div className={styles.layoutContainer}>
          <div className={styles.menu}>
            <TenantSidebar />
          </div>
          <div className={styles.pageContent}>
            <TenantHeader />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
