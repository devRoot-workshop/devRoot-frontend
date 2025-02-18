"use client";

import React from "react";
import styles from "./Header.module.css";
import { useAuth } from "@/lib/authContext";
import Button from "../button/Button";
import Link from "next/link";

function Header() {
  const { user, login, logout } = useAuth();
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


      <div>
        {user ? (
          <div>
            <Button size="small" color="pale" ghost={false} onClick={logout}>
              Kijelentkezés
            </Button>
          </div>
        ) : (
          <div>
            <Button size="small" color="pale" ghost={false} onClick={login}>
              Regisztráció
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
