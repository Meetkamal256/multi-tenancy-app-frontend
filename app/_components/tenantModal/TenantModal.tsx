"use client";
import React, { useState, useEffect } from "react";
import styles from "./tenantModal.module.css";
import { Tenant } from "@/app/types";

interface TenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tenant: Tenant) => void;
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
    id: tenantToEdit?.id ?? 0,
    name: tenantToEdit?.name || "",
    creationDate: tenantToEdit?.creationDate || "",
    active: tenantToEdit?.active || false,
  });

  useEffect(() => {
    if (tenantToEdit) {
      setTenant({
        id: tenantToEdit.id,
        name: tenantToEdit.name,
        creationDate: tenantToEdit.creationDate,
        active: tenantToEdit.active,
      });
    } else {
      setTenant({
        id: 0,
        name: "",
        creationDate: "",
        active: false,
      });
    }
  }, [tenantToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setTenant((prevTenant) => ({
      ...prevTenant,
      [name]: type === "checkbox" ? checked : value, // Correctly handle checkbox values
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tenant); // Ensure tenant is correctly passed to the onSubmit function
  };

  return (
    isOpen && (
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
              <label htmlFor="creationDate" className={styles.formLabel}>
                Creation Date
              </label>
              <input
                type="date"
                id="creationDate"
                name="creationDate"
                value={tenant.creationDate}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="active" className={styles.formLabel}>
                Active
              </label>
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={tenant.active}
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
    )
  );
};

export default TenantModal;
