import React, { useState } from "react";
import styles from "./tenantTable.module.css";

interface Tenant {
  id: number;
  name: string;
  creationDate: string;
  active: boolean;
}

const tenantsData: Tenant[] = [
  { id: 1, name: "Tenant A", creationDate: "2021-08-01", active: true },
  { id: 2, name: "Tenant B", creationDate: "2022-02-14", active: false },
  { id: 3, name: "Tenant C", creationDate: "2023-06-21", active: true },
];

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
    <div className={styles.tableContainer}>
      {/* Search and Filter */}
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
      
      {/* Tenant Table */}
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
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantTable;
