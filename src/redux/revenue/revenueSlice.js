import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  revenueData: [],
  loading: false,
  error: null,
};

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    fetchRevenueStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRevenueSuccess: (state, action) => {
      state.loading = false;
      state.revenueData = action.payload;
    },
    fetchRevenueFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRevenueStart, fetchRevenueSuccess, fetchRevenueFailure } = revenueSlice.actions;

export default revenueSlice.reducer;