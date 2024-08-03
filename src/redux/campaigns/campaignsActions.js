import {
  fetchCampaignsStart,
  fetchCampaignsSuccess,
  fetchCampaignsFailure,
  fetchCampaignSuggestionsSuccess,
  fetchCampaignPerformanceSuccess,
} from './campaignsSlice';
import { 
  mockCampaignSuggestions, 
  mockCampaignPerformance 
} from '../../utils/mockData';

export const fetchCampaigns = () => async (dispatch) => {
  dispatch(fetchCampaignsStart());
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // For now, we'll just return an empty array as we don't have mock data for all campaigns
    dispatch(fetchCampaignsSuccess([]));
  } catch (error) {
    dispatch(fetchCampaignsFailure('Failed to fetch campaigns'));
  }
};

export const fetchCampaignSuggestions = () => async (dispatch) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(fetchCampaignSuggestionsSuccess(mockCampaignSuggestions));
    return mockCampaignSuggestions;
  } catch (error) {
    console.error('Failed to fetch campaign suggestions:', error);
    throw error;
  }
};

export const fetchCampaignPerformance = () => async (dispatch) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(fetchCampaignPerformanceSuccess(mockCampaignPerformance));
    return mockCampaignPerformance;
  } catch (error) {
    console.error('Failed to fetch campaign performance:', error);
    throw error;
  }
};

export const createCampaign = (campaignData) => async (dispatch) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real scenario, we would send the campaignData to the server and get a response
    // For now, we'll just log the data and refresh the campaigns
    console.log('Creating campaign:', campaignData);
    dispatch(fetchCampaigns());
  } catch (error) {
    console.error('Failed to create campaign:', error);
    throw error;
  }
};