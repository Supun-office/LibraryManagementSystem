import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode; // Represents the content to be rendered inside the private route
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access authentication state from AuthContext

  if (!isAuthenticated) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the children (protected content) if the user is authenticated
  return <>{children}</>;
};

export default PrivateRoute;
