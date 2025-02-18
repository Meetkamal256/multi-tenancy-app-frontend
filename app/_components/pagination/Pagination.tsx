"use client";
import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import styles from "./pagination.module.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  // Generate an array of page numbers
  const getPageNumbers = () => {
    const pages = [];
    
    // When totalPages is less than or equal to 5, show all page numbers
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);
      
      // Show pages near the current page
      if (currentPage > 2) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push(currentPage + 1);
      
      // Show the last page
      if (currentPage < totalPages - 2) pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pageInfo}>
        <span>
          {currentPage} of {totalPages}
        </span>
      </div>
      
      <div className={styles.pageNumbers}>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.current : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        
        {currentPage < totalPages - 3 && (
          <span className={styles.ellipsis}>...</span>
        )}
        
        {currentPage < totalPages - 2 && (
          <button
            className={`${styles.pageButton} ${
              totalPages === currentPage ? styles.current : ""
            }`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}
      </div>
      
      <div className={styles.nextPrevButtons}>
        <button
          className={styles.prevButton}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <FaLongArrowAltLeft size={20} className={styles.arrowIcon} />
          Previous
        </button>
        <button
          className={styles.nextButton}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <FaLongArrowAltRight size={20} className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
