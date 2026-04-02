import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userRole !== "admin") {
    // If not an admin, redirect to home or a forbidden page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
