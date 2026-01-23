import { createContext, useState, useContext, useEffect } from "react";
import { BACKEND_URL } from "./variables.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/current_user/`, {
      credentials: "include",
    })
      .then((res) => res.ok ? res.json() : {})
      .then((data) => {
        setIsLoggedIn(!!data.username);
        setUsername(data.username || "");
        setEmail(data.email || "");
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
