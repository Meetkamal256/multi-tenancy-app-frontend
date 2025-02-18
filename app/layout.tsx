import React, { ReactNode } from "react";
import Header from "./_components/header/Header";
import Sidebar from "./_components/sidebar/Sidebar";
import Footer from "./_components/footer/Footer";
import styles from "./layout.module.css";
import "./globals.css"

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
          <Header />
          <div className={styles.mainContent}>
            <Sidebar />
            <main className={styles.pageContent}>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default Layout;
