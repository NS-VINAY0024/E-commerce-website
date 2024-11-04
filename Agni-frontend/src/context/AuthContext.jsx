// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/auth";
import { setItem, getItem, removeItem } from "../utils/localStorage"; // Import local storage utils

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for saved auth token and validate it on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = getItem("authToken"); // Use the utility function
      if (token) {
        try {
          const userData = await authService.validateToken(token);
          setUser(userData);
        } catch (error) {
          console.error("Token validation failed:", error);
          removeItem("authToken"); // Clear invalid token using utility
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      const userData = await authService.login(credentials);
      setItem("authToken", userData.token); // Store token using utility
      setUser(userData);
      return userData; // Return user data on successful login
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    removeItem("authToken"); // Clear token using utility
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
