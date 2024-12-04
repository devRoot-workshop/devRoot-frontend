"use client"

import ApiTester from "@/components/custom/apiTester";
import { useAuth } from "@/lib/authContext";

export default function Header() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName || user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in to access the app.</p>
          <button onClick={login}>Login with Google</button>
        </div>
      )}
    </div>
  );
}
