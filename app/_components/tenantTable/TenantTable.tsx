import React, { useState } from "react";
import styles from "./tenantTable.module.css";
import { tenantsData } from "@/app/data";

interface Tenant {
  id: number;
  name: string;
  creationDate: string;
  active: boolean;
}

const TenantTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };
  
  const filteredTenants = tenantsData.filter((tenant) => {
    const matchesSearch = tenant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" && tenant.active) ||
      (filterStatus === "Inactive" && !tenant.active);
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <div className={styles.searchAndFilter}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search tenants"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            className={styles.filterSelect}
            value={filterStatus}
            onChange={handleStatusFilter}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.tenantTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Creation Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td>{tenant.name}</td>
                  <td>{tenant.creationDate}</td>
                  <td>{tenant.active ? "Active" : "Inactive"}</td>
                  <td>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantTable;
