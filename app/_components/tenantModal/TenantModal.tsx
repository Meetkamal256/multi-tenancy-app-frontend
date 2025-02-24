"use client";
import React, { useState, useEffect } from "react";
import styles from "./tenantModal.module.css";
import { Tenant } from "@/app/types";
import { IoMdClose } from "react-icons/io";

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
  const [tenant, setTenant] = useState<Tenant>({
    id: isAddingTenant ? null : tenantToEdit?.id ?? null,
    name: tenantToEdit?.name ?? "",
    email: tenantToEdit?.email ?? "",
    password: "", // Add password field here
    isActive: tenantToEdit?.isActive ?? true,
    subscription: tenantToEdit?.subscription ?? "Basic",
    billingCycle: tenantToEdit?.billingCycle ?? "Monthly",
    dataUsage: tenantToEdit?.dataUsage ?? 0,
    createdAt: tenantToEdit?.createdAt ?? new Date().toISOString(),
  });
  
  useEffect(() => {
    if (isAddingTenant) {
      setTenant({
        id: null,
        name: "",
        email: "",
        password: "",
        isActive: true,
        subscription: "Basic",
        billingCycle: "Monthly",
        dataUsage: 0,
        createdAt: new Date().toISOString(),
      });
    } else if (tenantToEdit?.id) {
      setTenant({
        id: tenantToEdit.id,
        name: tenantToEdit.name,
        email: tenantToEdit.email,
        password: "", // Keep password empty when editing
        isActive: tenantToEdit.isActive,
        subscription: tenantToEdit.subscription ?? "Basic",
        billingCycle: tenantToEdit.billingCycle ?? "Monthly",
        dataUsage: tenantToEdit.dataUsage ?? 0,
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
    
    // Basic validation
    if (!tenant.name.trim() || !tenant.email.trim()) {
      console.error("Please fill all required fields.");
      return;
    }
    
    if (isAddingTenant && !tenant.password?.trim()) {
      console.error("Password is required for new tenants.");
      return;
    }
    
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
          <IoMdClose size={30} />
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

          {/* Password Field */}
          {isAddingTenant && (
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={tenant.password}
                onChange={handleChange}
                required={isAddingTenant}
                autoComplete="current-password"
                className={styles.formInput}
              />
            </div>
          )}

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
