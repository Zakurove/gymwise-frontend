import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  campaigns: [],
  campaignSuggestions: [],
  campaignPerformance: [],
  loading: false,
  error: null,
};

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    fetchCampaignsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCampaignsSuccess: (state, action) => {
      state.loading = false;
      state.campaigns = action.payload;
    },
    fetchCampaignsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCampaignSuggestionsSuccess: (state, action) => {
      state.campaignSuggestions = action.payload;
    },
    fetchCampaignPerformanceSuccess: (state, action) => {
      state.campaignPerformance = action.payload;
    },
  },
});

export const {
  fetchCampaignsStart,
  fetchCampaignsSuccess,
  fetchCampaignsFailure,
  fetchCampaignSuggestionsSuccess,
  fetchCampaignPerformanceSuccess,
} = campaignsSlice.actions;

export default campaignsSlice.reducer;