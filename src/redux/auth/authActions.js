import axios from '../../utils/axiosConfig';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logoutStart, 
  logoutSuccess,
  registerStart, 
  registerSuccess, 
  registerFailure,
  resetAuthState,
  updateUser,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  setLoading,
} from './authSlice';
import Router from 'next/router';

export const login = (email, password, rememberMe) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('/api/token/', { email, password });
    const { access, refresh, user } = response.data;
    if (rememberMe) {
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);
    } else {
      sessionStorage.setItem('token', access);
      sessionStorage.setItem('refreshToken', refresh);
    }
    dispatch(loginSuccess({ user, token: access }));
    return user;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.detail || 'Login failed'));
    throw error;
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await axios.post('/api/register/', userData);
    dispatch(registerSuccess());
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.response?.data?.error || 'Registration failed';
    dispatch(registerFailure(errorMessage));
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutStart());
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  await dispatch(logoutSuccess());
  await Router.push('/login');
};

export const fetchUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.get('/api/user/');
      dispatch(loginSuccess({ user: response.data, token }));
    } catch (error) {
      console.error('Error fetching user:', error);
      await dispatch(logoutUser());
    }
  } else {
    dispatch(logoutSuccess());
  }
  dispatch(setLoading(false));
};

export const refreshToken = () => async (dispatch) => {
  const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  if (refreshToken) {
    try {
      const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
      const { access } = response.data;
      localStorage.setItem('token', access);
      sessionStorage.setItem('token', access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      return access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      await dispatch(logoutUser());
      throw error;
    }
  }
  return null;
};

export const resetAuth = () => (dispatch) => {
  dispatch(resetAuthState());
};

export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    const response = await axios.patch('/api/user/', userData);
    dispatch(updateUser(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordStart());
  try {
    const response = await axios.post('/api/forgot-password/', { email });
    dispatch(forgotPasswordSuccess());
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.response?.data?.error || 'Failed to send reset password link';
    dispatch(forgotPasswordFailure(errorMessage));
    throw error;
  }
};