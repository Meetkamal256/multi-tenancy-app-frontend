import React, { useEffect, useState } from "react";
import styles from "./tenantTable.module.css";
import TenantModal from "../tenantModal/TenantModal";
import { Tenant } from "@/app/types";
import Pagination from "../pagination/Pagination";

const API_URL = "http://localhost:5000/tenants";

const TenantTable = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingTenant, setIsAddingTenant] = useState(false);
  const [tenantToEdit, setTenantToEdit] = useState<Tenant | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Fetch tenants function (defined outside useEffect to avoid infinite loop)
  const fetchTenants = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTenants(data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };
  
  useEffect(() => {
    fetchTenants();
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };
  
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch = tenant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" && tenant.isActive) ||
      (filterStatus === "Inactive" && !tenant.isActive);
    return matchesSearch && matchesStatus;
  });
  
  const paginatedTenants = filteredTenants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const openModal = (tenant?: Tenant) => {
    setTenantToEdit(tenant);
    setIsAddingTenant(!tenant);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setTenantToEdit(undefined);
  };
  
  const handleModalSubmit = async (
    tenant: Omit<Tenant, "id" | "createdAt"> | Tenant
  ) => {
    if (!("id" in tenant)) {
      await addTenant(tenant);
    } else {
      await updateTenant(tenant as Tenant);
    }
    closeModal();
  };
  
  const addTenant = async (tenant: Omit<Tenant, "id" | "createdAt">) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tenant),
      });
      const responseData = await response.json();
      if (response.ok) {
        setTenants((prev) => [...prev, responseData]);
      } else {
        console.error(
          "Failed to add tenant:",
          response.statusText,
          responseData
        );
      }
    } catch (error) {
      console.error("Error adding tenant:", error);
    }
  };
  
  const updateTenant = async (tenant: Tenant) => {
    try {
      const response = await fetch(`${API_URL}/${tenant.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tenant),
      });
      if (response.ok) {
        setTenants((prev) =>
          prev.map((t) => (t.id === tenant.id ? tenant : t))
        );
      }
    } catch (error) {
      console.error("Error updating tenant:", error);
    }
  };
  
  const deleteTenant = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setTenants((prev) => prev.filter((tenant) => tenant.id !== id));
      }
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
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
        <button className={styles.addTenantBtn} onClick={() => openModal()}>
          Add Tenant
        </button>
        <div className={styles.tableWrapper}>
          <table className={styles.tenantTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td>{tenant.name}</td>
                  <td>{tenant.email}</td>
                  <td>{tenant.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      className={styles.editBtn}
                      onClick={() => openModal(tenant)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        if (tenant.id !== null) deleteTenant(tenant.id);
                      }}
                    >
                      Delete
                    </button>
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
        onPageChange={setCurrentPage}
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
