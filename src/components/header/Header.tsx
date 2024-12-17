"use client"

import styles from './Header.module.css'
import { useAuth } from "@/lib/authContext";
import Button from "../button/Button";

export default function Header() {
  const { user, login, logout } = useAuth();
  console.log(user?.getIdToken())
  console.log(user?.uid)
  return (
    <div className={styles['header-container']}>
      <div className="flex space-x-12">
        <a href="/feladatok" className={styles['header-element']}>Feladatok</a>
        <a href="/kategoriak" className={styles['header-element']}>Kategóriák</a>
      </div>

      <div>
        {user ? (
          <div>
            <Button
              size="small"
              type="pale"
              ghost={false}
              onClick={logout}
            >
              Kijelentkezés
            </Button>
          </div>
        ) : (
          <div>
            <Button
              size="small"
              type="pale"
              ghost={false}
              onClick={login}
            >
              Regisztráció
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
