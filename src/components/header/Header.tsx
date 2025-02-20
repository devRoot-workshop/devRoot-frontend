import React, { useState } from "react";
import styles from "./Header.module.css";
import { useAuth } from "@/lib/authContext";
import Button from "../button/Button";
import Link from "next/link";
import { FaUpload, FaSignOutAlt, FaBars } from "react-icons/fa";

const Header: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className={`${styles["header-wrapper"]} ${mobileMenuOpen ? styles["menu-open"] : ""}`}>
      <div className={styles["header-container"]}>
        <div className={styles["header-left-container"]}>
          <Link prefetch={false} href="/" className={styles["header-logo"]}>
            devRoot
          </Link>
          <div className={styles.headerElements}>          
            <Link prefetch={false} href="/feladatok" className={styles["header-element"]}>
              Feladatok
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className={styles["mobile-menu-button"]} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FaBars size={24} />
        </div>

        {/* Desktop User Menu */}
        <div className={`${styles["header-user-container"]} ${styles.desktop}`}>
          {user ? (
            <div className={styles["user-profile"]}>
              <Link
                prefetch={false}
                href="/feladatok/feltoltes"
                className={styles["header-element"]}
              >
                <FaUpload className={styles["header-icon"]} />
                Feltöltés
              </Link>
              <div
                className={styles["header-element"]}
                onClick={logout}
              >
                <FaSignOutAlt className={styles["header-icon"]} />
                Kijelentkezés
              </div>
            </div>
          ) : (
            <Button
              size="small"
              color="pale"
              ghost={false}
              onClick={login}
              className={styles.loginButton}
            >
              Bejelentkezés
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles["mobile-menu"]} ${mobileMenuOpen ? styles.open : ""}`}>
        <Link
          prefetch={false}
          href="/feladatok"
          className={styles["mobile-menu-item"]}
          onClick={() => setMobileMenuOpen(false)}
        >
          Feladatok
        </Link>
        {user ? (
          <>
            <Link
              prefetch={false}
              href="/feladatok/feltoltes"
              className={styles["mobile-menu-item"]}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUpload className={styles["menu-icon"]} />
              Feltöltés
            </Link>
            <div
              className={styles["mobile-menu-item"]}
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
            >
              <FaSignOutAlt className={styles["menu-icon"]} />
              Kijelentkezés
            </div>
          </>
        ) : (
          <Button
            size="small"
            color="pale"
            ghost={false}
            onClick={() => {
              login();
              setMobileMenuOpen(false);
            }}
            className={styles.mobileLoginButton}
          >
            Bejelentkezés
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;