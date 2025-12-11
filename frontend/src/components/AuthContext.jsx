import { createContext, useState, useContext, useEffect } from "react";
import { BACKEND_URL } from "./variables.js";
import { data } from "react-router-dom";


const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch((`${BACKEND_URL}/current_user/`), {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => { 
        setIsLoggedIn(!!data.username);
        setUsername(data.username || "");
        setEmail(data.email || "fudge");
    });
    }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, email, setEmail}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
