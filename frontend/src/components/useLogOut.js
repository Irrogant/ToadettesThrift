import getCookie from "./cookie.js";
import { useAuth } from "./AuthContext.jsx";
import { BACKEND_URL } from "./variables.js";
import { useNavigate } from 'react-router-dom'

function useLogOut() {
  const { setIsLoggedIn, setUsername, setEmail } = useAuth();
  const navigate = useNavigate()

  const logout = async () => {
    const response = await fetch(`${BACKEND_URL}/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (response.ok) {
      setIsLoggedIn(false);
      setUsername("");
      setEmail("");
      navigate("/")
    } else {
      alert(data.error || "Logout failed");
    }
  };

  return logout;
}

export default useLogOut;
