import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: {},
  loading: false,
  error: null,
};

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    fetchMetricsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMetricsSuccess: (state, action) => {
      state.loading = false;
      state.metrics = action.payload;
    },
    fetchMetricsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMetricsStart,
  fetchMetricsSuccess,
  fetchMetricsFailure,
} = metricsSlice.actions;

export default metricsSlice.reducer;