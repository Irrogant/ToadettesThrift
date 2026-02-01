import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;