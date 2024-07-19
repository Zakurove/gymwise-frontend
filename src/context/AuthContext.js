import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/api/user/", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error loading user:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("refreshToken");
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password, rememberMe) => {
    try {
      const response = await axios.post("http://localhost:8000/api/token/", { email, password });
      const { access, refresh, user } = response.data;
      
      if (rememberMe) {
        localStorage.setItem("token", access);
        localStorage.setItem("refreshToken", refresh);
      } else {
        sessionStorage.setItem("token", access);
        sessionStorage.setItem("refreshToken", refresh);
      }
      
      setUser(user);
      return user;
    } catch (error) {
      console.error("Login failed", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    setUser(null);
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await axios.post("http://localhost:8000/api/token/refresh/", {
          refresh: refreshToken
        });
        const { access } = response.data;
        if (localStorage.getItem("token")) {
          localStorage.setItem("token", access);
        } else {
          sessionStorage.setItem("token", access);
        }
        return access;
      } catch (error) {
        console.error("Error refreshing token:", error);
        logout();
        throw error;
      }
    }
    return null;
  };

  // Axios interceptor for token refresh
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);