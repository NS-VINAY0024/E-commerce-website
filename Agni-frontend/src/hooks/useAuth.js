// src/hooks/useAuth.js
import { useState } from "react";
import { authService } from "../services/auth";
import { setItem, removeItem } from "../utils/localStorage"; // Import local storage utils

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const userData = await authService.login(credentials);
      setItem("authToken", userData.token); // Save token to localStorage using utility
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeItem("authToken"); // Clear token from localStorage using utility
    setUser(null);
  };

  return { user, loading, login, logout };
};
