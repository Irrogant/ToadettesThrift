import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To redirect the user after logout
import { useAuth } from "./AuthContext"; // Access the auth context

function Logout() {
  const { setIsLoggedIn, setUsername } = useAuth(); // Access setters from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    const doLogout = () => {
      // Clear user data from localStorage
      localStorage.removeItem("username");

      // Reset auth context state
      setIsLoggedIn(false);
      setUsername(null);

      // Redirect the user to the login page or homepage
      navigate("/login"); // Or navigate("/") for homepage
    };

    doLogout();
  }, [setIsLoggedIn, setUsername, navigate]);

  return <p>Logging out...</p>;
}

export default Logout;