import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user data from localStorage
  const fetchUser = () => {
    const storedUsername = localStorage.getItem("username");
    const isUserLoggedIn = !!storedUsername;

    setIsLoggedIn(isUserLoggedIn);
    setUsername(storedUsername);

    setLoading(false);
  };

  useEffect(() => {
    fetchUser(); // Retrieve user data from localStorage when the component loads
  }, []);

  const login = (username) => {
    localStorage.setItem("username", username);
    setUsername(username);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        setIsLoggedIn,
        username,
        setUsername,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}