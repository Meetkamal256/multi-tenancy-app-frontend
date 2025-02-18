import React, { useState } from "react";
import styles from "./tenantTable.module.css";
import { tenantsData } from "@/app/data";
import TenantModal from "../tenantModal/TenantModal";
import { Tenant } from "@/app/types";
import Pagination from "../pagination/Pagination";

const TenantTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenantToEdit, setTenantToEdit] = useState<Tenant | undefined>(
    undefined
  );
  const [isAddingTenant, setIsAddingTenant] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal state for adding tenant
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
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
  
  // Slice tenants based on the current page
  const paginatedTenants = filteredTenants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const openModal = (tenant?: Tenant) => {
    setTenantToEdit(tenant);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleModalSubmit = (tenant: Tenant) => {
    console.log(tenant);
    closeModal();
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Open the modal for adding a new tenant
  const openAddTenantModal = () => {
    setTenantToEdit(undefined);
    setIsAddingTenant(true);
    setIsModalOpen(true);
  };
  
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
        
        <button className={styles.addTenantBtn} onClick={openAddTenantModal}>
          Add Tenant
        </button>
        
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
              {paginatedTenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td>{tenant.name}</td>
                  <td>{tenant.creationDate}</td>
                  <td>{tenant.active ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      className={styles.editBtn}
                      onClick={() => openModal(tenant)}
                    >
                      Edit
                    </button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Pagination
        totalItems={filteredTenants.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <TenantModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        tenantToEdit={tenantToEdit}
        isAddingTenant={isAddingTenant}
      />
    </div>
  );
};

export default TenantTable;
