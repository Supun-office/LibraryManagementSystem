import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import EditBook from "./components/EditBook";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook"; // Import AddBook component

// Component to guard protected routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  // If the user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login
  }

  // If authenticated, render the children components (protected content)
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire app in AuthProvider to manage authentication state */}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/register" element={<Register />} />{" "}
          {/* Registration page */}
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {" "}
                {/* Ensure only authenticated users can access */}
                <NavBar /> {/* Navigation bar for authenticated users */}
                <BookList /> {/* Main book listing page */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-book/:id"
            element={
              <ProtectedRoute>
                {" "}
                {/* Ensure only authenticated users can access */}
                <NavBar />
                <EditBook /> {/* Edit book page */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <ProtectedRoute>
                {" "}
                {/* Ensure only authenticated users can access */}
                <NavBar />
                <AddBook /> {/* Add new book page */}
              </ProtectedRoute>
            }
          />
          {/* Redirect to login if the route doesn't match */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
