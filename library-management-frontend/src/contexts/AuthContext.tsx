import React, { createContext, useContext, useState, useEffect } from "react";

// Define the type for the AuthContext
interface AuthContextType {
  isAuthenticated: boolean; // Track whether the user is authenticated
  login: () => void; // Function to log the user in
  logout: () => void; // Function to log the user out
}

// Create the AuthContext with undefined as the initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component: Wraps your app to provide authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if there is a stored token in localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true); // If token exists, set the user as authenticated
    } else {
      setIsAuthenticated(false); // If no token, user is not authenticated
    }
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Function to handle login: sets isAuthenticated to true and stores a dummy token
  const login = () => {
    setIsAuthenticated(true); // User is now authenticated
    localStorage.setItem("auth_token", "dummy_token"); // Store the dummy token in localStorage
  };

  // Function to handle logout: removes the token and sets isAuthenticated to false
  const logout = () => {
    localStorage.removeItem("auth_token"); // Remove the token from localStorage
    setIsAuthenticated(false); // User is now logged out
  };

  return (
    // Provide the authentication state and functions to the app through context
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = (): AuthContextType => {
  // Access the AuthContext
  const context = useContext(AuthContext);

  // If context is not available, throw an error (ensures this hook is used within AuthProvider)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context; // Return the context value (authentication state and functions)
};
