import { useEffect } from "react";
import useLogOut from "./useLogOut.js";

function Logout() {
  const logout = useLogOut();

  useEffect(() => {
    async function doLogout() {
      await logout();
    }

    doLogout();
  }, []);

  return <p>Logged out...</p>;
}

export default Logout;
