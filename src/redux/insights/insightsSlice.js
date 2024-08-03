import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  insights: [],
  loading: false,
  error: null,
};

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    fetchInsightsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchInsightsSuccess: (state, action) => {
      state.loading = false;
      state.insights = action.payload;
    },
    fetchInsightsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchInsightsStart,
  fetchInsightsSuccess,
  fetchInsightsFailure,
} = insightsSlice.actions;

export default insightsSlice.reducer;