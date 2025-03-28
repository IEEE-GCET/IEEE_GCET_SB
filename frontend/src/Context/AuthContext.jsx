import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSessionStatus = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/ieeegcetsb/user/session-status", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log("Session status response:", response.status);
      const status = response.status || false;
      setIsAuthenticated(status === 200);
      // console.log("Session status:", response.status);
    } catch (error) {
      // console.error("Error checking session status:", error);
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