import axios from 'axios';
import {
  fetchSettingsStart,
  fetchSettingsSuccess,
  fetchSettingsFailure,
  updateAISettings,
  updateUIPreferences,
} from './settingsSlice';

export const fetchSettings = () => async (dispatch) => {
  dispatch(fetchSettingsStart());
  try {
    const response = await axios.get('/api/settings');
    dispatch(fetchSettingsSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchSettingsFailure(error.response?.data?.message || 'Failed to fetch settings'));
    throw error;
  }
};

export const updateAISettingsAction = (settings) => async (dispatch) => {
  try {
    const response = await axios.put('/api/settings/ai', settings);
    dispatch(updateAISettings(response.data));
    return response.data;
  } catch (error) {
    console.error('Failed to update AI settings:', error);
    throw error;
  }
};

export const updateUIPreferencesAction = (preferences) => async (dispatch) => {
  try {
    const response = await axios.put('/api/settings/ui', preferences);
    dispatch(updateUIPreferences(response.data));
    return response.data;
  } catch (error) {
    console.error('Failed to update UI preferences:', error);
    throw error;
  }
};