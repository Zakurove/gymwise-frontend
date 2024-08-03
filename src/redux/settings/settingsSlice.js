import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  aiSettings: {},
  uiPreferences: {},
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    fetchSettingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSettingsSuccess: (state, action) => {
      state.loading = false;
      state.aiSettings = action.payload.aiSettings;
      state.uiPreferences = action.payload.uiPreferences;
    },
    fetchSettingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAISettings: (state, action) => {
      state.aiSettings = { ...state.aiSettings, ...action.payload };
    },
    updateUIPreferences: (state, action) => {
      state.uiPreferences = { ...state.uiPreferences, ...action.payload };
    },
  },
});

export const {
  fetchSettingsStart,
  fetchSettingsSuccess,
  fetchSettingsFailure,
  updateAISettings,
  updateUIPreferences,
} = settingsSlice.actions;

export default settingsSlice.reducer;