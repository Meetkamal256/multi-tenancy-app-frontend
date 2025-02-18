import React, { useState } from "react";
import styles from "./tenantTable.module.css";

interface Tenant {
  id: number;
  name: string;
  creationDate: string;
  active: boolean;
}

const tenantsData: Tenant[] = [
  { id: 1, name: "John Doe", creationDate: "2021-08-01", active: true },
  { id: 2, name: "Jane Smith", creationDate: "2022-02-14", active: false },
  { id: 3, name: "Michael Johnson", creationDate: "2023-06-21", active: true },
  { id: 4, name: "Emily Davis", creationDate: "2023-06-21", active: true },
  { id: 5, name: "David Brown", creationDate: "2023-06-21", active: true },
  { id: 6, name: "Sarah Wilson", creationDate: "2023-06-21", active: true },
  { id: 7, name: "James Moore", creationDate: "2023-06-21", active: false },
  { id: 8, name: "Linda Taylor", creationDate: "2022-03-10", active: true },
  { id: 9, name: "Robert Anderson", creationDate: "2021-09-01", active: true },
  { id: 10, name: "Maria Thomas", creationDate: "2020-01-15", active: false },
  { id: 11, name: "William Jackson", creationDate: "2021-11-25", active: true },
  {
    id: 12,
    name: "Elizabeth Harris",
    creationDate: "2023-01-05",
    active: true,
  },
  {
    id: 13,
    name: "Christopher Martin",
    creationDate: "2022-10-11",
    active: true,
  },
  { id: 14, name: "Patricia Lee", creationDate: "2021-02-08", active: false },
  { id: 15, name: "Daniel Walker", creationDate: "2023-03-18", active: true },
  { id: 16, name: "Nancy Hall", creationDate: "2021-07-30", active: false },
  { id: 17, name: "Mark Allen", creationDate: "2020-05-12", active: true },
  { id: 18, name: "Susan Young", creationDate: "2022-11-22", active: false },
  { id: 19, name: "Joseph King", creationDate: "2023-02-28", active: true },
  { id: 20, name: "Karen Wright", creationDate: "2023-04-07", active: false },
  { id: 21, name: "Steven Scott", creationDate: "2022-05-13", active: true },
  { id: 22, name: "Deborah Green", creationDate: "2021-12-06", active: false },
  { id: 23, name: "Larry Adams", creationDate: "2023-02-17", active: true },
  { id: 24, name: "Betty Nelson", creationDate: "2022-08-25", active: false },
  { id: 25, name: "James Carter", creationDate: "2023-05-30", active: true },
  { id: 26, name: "Alice Mitchell", creationDate: "2021-03-03", active: true },
  { id: 27, name: "George Perez", creationDate: "2022-04-19", active: false },
  { id: 28, name: "Helen Roberts", creationDate: "2023-07-15", active: true },
  { id: 29, name: "Paul Turner", creationDate: "2022-01-10", active: true },
  { id: 30, name: "Ruth Phillips", creationDate: "2020-08-23", active: false },
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
