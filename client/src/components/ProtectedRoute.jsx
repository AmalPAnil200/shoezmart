import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    // We pass a 'message' in the state so the Login page knows to show an alert
    return (
      <Navigate 
        to={adminOnly ? "/admin/login" : "/login"} 
        state={{ message: "Please login to access this page." }} 
        replace 
      />
    );
  }

  if (adminOnly && userRole !== "admin") {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); 
    return (
      <Navigate 
        to="/admin/login" 
        state={{ message: "Admin access required. Please log in with an admin account." }} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;
