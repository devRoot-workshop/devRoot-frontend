"use client"

import React, { useState } from "react";
import styles from "./PaginationBox.module.css";

interface PaginationBoxProps {
  totalPages: number;
  onChange?: (page: number) => void;
  isLoading?: boolean;
}

const PaginationBox: React.FC<PaginationBoxProps> = ({ totalPages, onChange, isLoading }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !isLoading && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (onChange) onChange(page);
    }
  };

  const getPageNumbers = (): number[] => {
    const pagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
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