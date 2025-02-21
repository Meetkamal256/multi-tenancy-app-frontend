"use client";
import TenantTable from "@/app/_components/tenantTable/TenantTable";
import styles from "./tenants.module.css"

const tenantsPage = () => {
  return <div className={styles.container}>
  <TenantTable />
  </div>;
};

export default tenantsPage;