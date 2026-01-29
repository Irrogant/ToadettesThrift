import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function LoggedInRoute() {
    const { isLoggedIn, loading } = useAuth();

    if (loading) return null;
    if (isLoggedIn) return <Navigate to="/account" replace />;

    return <Outlet />;
}

export default LoggedInRoute;