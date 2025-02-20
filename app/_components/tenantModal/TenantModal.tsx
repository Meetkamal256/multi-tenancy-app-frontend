"use client";
import React, { useState, useEffect } from "react";
import styles from "./tenantModal.module.css";
import { Tenant } from "@/app/types";

interface TenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tenant: Omit<Tenant, "id"> | Tenant) => void;
  tenantToEdit?: Tenant;
  isAddingTenant: boolean;
}

const TenantModal: React.FC<TenantModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  tenantToEdit,
  isAddingTenant,
}) => {
  const [tenant, setTenant] = useState<Omit<Tenant, "id"> | Tenant>({
    id: isAddingTenant ? undefined : tenantToEdit?.id, // Keep ID only for editing
    name: tenantToEdit?.name ?? "",
    email: tenantToEdit?.email ?? "",
    isActive: tenantToEdit?.isActive ?? true,
    createdAt: tenantToEdit?.createdAt ?? new Date().toISOString(),
  });
 
 useEffect(() => {
  if (isAddingTenant) {
    setTenant({
      name: "",
      email: "",
      isActive: true,
      createdAt: new Date().toISOString(),
    });
  } else if (tenantToEdit?.id) { // Only set if ID exists
    setTenant({
      id: tenantToEdit.id,
      name: tenantToEdit.name,
      email: tenantToEdit.email,
      isActive: tenantToEdit.isActive,
      createdAt: tenantToEdit.createdAt,
    });
  }
}, [tenantToEdit, isAddingTenant]);
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTenant((prevTenant) => ({
      ...prevTenant,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  console.log("Tenant to Edit:", tenantToEdit);
  
  if (!isAddingTenant && !tenantToEdit?.id) {
    console.error("Error: Tenant ID is missing when editing!");
    return;
  }
  
  onSubmit(tenant);
  onClose();
};
  
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.addEditTenant}>
          {isAddingTenant ? "Add Tenant" : "Edit Tenant"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Tenant Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={tenant.name}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={tenant.email}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="isActive" className={styles.formLabel}>
              Active
            </label>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={tenant.isActive}
              onChange={handleChange}
              className={styles.checkboxInput}
            />
          </div>
          
          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton}>
              {isAddingTenant ? "Add Tenant" : "Save Changes"}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantModal;
