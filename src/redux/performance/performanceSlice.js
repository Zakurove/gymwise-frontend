import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  performanceData: {},
  loading: false,
  error: null,
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    fetchPerformanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPerformanceSuccess: (state, action) => {
      state.loading = false;
      state.performanceData = action.payload;
    },
    fetchPerformanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPerformanceStart,
  fetchPerformanceSuccess,
  fetchPerformanceFailure,
} = performanceSlice.actions;

export default performanceSlice.reducer;