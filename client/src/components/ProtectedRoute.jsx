import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />;
  }

  if (adminOnly && userRole !== "admin") {
    // If not an admin, redirect them to the admin login or back to shop?
    // Usually, unauthorized access to admin area should redirect back to /admin/login 
    // to prompt for admin credentials specifically.
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); 
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
