import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { useToast } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../redux/auth/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get('/api/user/');
          dispatch(loginSuccess({ user: response.data, token }));
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          console.error("Error loading user:", error);
          await logoutUser();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [dispatch]);

  const login = async (email, password, rememberMe) => {
    try {
      const response = await axios.post('/api/token/', { email, password });
      const { access, refresh, user } = response.data;
      
      if (rememberMe) {
        localStorage.setItem("token", access);
        localStorage.setItem("refreshToken", refresh);
      } else {
        sessionStorage.setItem("token", access);
        sessionStorage.setItem("refreshToken", refresh);
      }
      
      dispatch(loginSuccess({ user, token: access }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
  
      router.push('/dashboard');
  
      return user;
    } catch (error) {
      console.error("Login failed", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    dispatch(logout());
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await axios.post('/api/token/refresh/', {
          refresh: refreshToken
        });
        const { access } = response.data;
        if (localStorage.getItem("token")) {
          localStorage.setItem("token", access);
        } else {
          sessionStorage.setItem("token", access);
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        return access;
      } catch (error) {
        console.error("Error refreshing token:", error);
        await logoutUser();
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
    <AuthContext.Provider 
      value={{ 
        login, 
        logoutUser, 
        loading, 
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);