import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  loggingOut: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loggingIn = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.loggingIn = false;  // Keep this as is
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loggingIn = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.loggingOut = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.loggingOut = false;
      state.loggingIn = false;
      state.loading = false;
      state.error = null;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
    },
    forgotPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess: (state) => {
      state.loading = false;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
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
} = authSlice.actions;

export default authSlice.reducer;