import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSessionStatus = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.USER_SESSION, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const status = response.status || false;
      setIsAuthenticated(status === 200);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSessionStatus();
  }, [checkSessionStatus]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};