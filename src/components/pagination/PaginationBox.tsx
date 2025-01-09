"use client"

import React, { useState } from "react";
import styles from "./PaginationBox.module.css";

interface PaginationBoxProps {
  onChange?: (page: number) => void;
  isLoading?: boolean;
}

const PaginationBox: React.FC<PaginationBoxProps> = ({ onChange, isLoading }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !isLoading) {
      setCurrentPage(page);
      if (onChange) onChange(page);
    }
  };

  const getPageNumbers = (): number[] => {
    const startPage = Math.max(1, currentPage - 2);
    return Array.from({ length: 5 }, (_, i) => startPage + i);
  };

  return (
    <div className={styles.container}>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          disabled={isLoading}
          className={`${styles.button} ${page === currentPage ? styles.active : ""} ${
            isLoading ? styles.disabled : ""
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationBox;