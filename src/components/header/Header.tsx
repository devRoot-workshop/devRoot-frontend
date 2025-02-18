"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import { useAuth } from "@/lib/authContext";
import Button from "../button/Button";
import Link from "next/link";
import { FaUserCircle, FaUpload, FaSignOutAlt } from "react-icons/fa";

const Header: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles["header-container"]}>
      <div className="flex space-x-12">
        <Link prefetch={false} href="/" className={styles["header-element"]}>
          Kezdőlap
        </Link>
        <Link prefetch={false} href="/feladatok" className={styles["header-element"]}>
          Feladatok
        </Link>
      </div>
      <div className={styles["header-user-container"]} ref={dropdownRef}>
        {user ? (
          <div className={styles["user-dropdown"]}>
            <FaUserCircle
              size={48}
              className={styles["user-icon"]}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className={styles["dropdown-menu"]}>
                <Link
                  prefetch={false}
                  href="/feladatok/feltoltes"
                  className={styles["dropdown-item"]}
                >
                  <FaUpload className={styles["dropdown-icon"]} />
                  Feltöltés
                </Link>
                <div className={styles["dropdown-item"]} onClick={logout}>
                  <FaSignOutAlt className={styles["dropdown-icon"]} />
                  Kijelentkezés
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button size="small" color="pale" ghost={false} onClick={login}>
            Bejelentkezés
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
