import { createContext, useState, useContext, useEffect } from "react";
import { BACKEND_URL } from "./variables.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    fetch(`${BACKEND_URL}/current_user/`, {
      credentials: "include",
    })
      .then((res) => res.ok ? res.json() : {})
      .then((data) => {
        setIsLoggedIn(!!data.username);
        setUsername(data.username ?? null);
        setEmail(data.email ?? null);
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [isLoggedIn])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        setIsLoggedIn,
        username,
        setUsername,
        email,
        setEmail,
        fetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
