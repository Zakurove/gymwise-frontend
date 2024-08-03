import {
  fetchInsightsStart,
  fetchInsightsSuccess,
  fetchInsightsFailure,
} from './insightsSlice';
import { mockInsights } from '../../utils/mockData';

export const fetchInsights = () => async (dispatch) => {
  dispatch(fetchInsightsStart());
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(fetchInsightsSuccess(mockInsights));
    return mockInsights;
  } catch (error) {
    dispatch(fetchInsightsFailure('Failed to fetch insights'));
    throw error;
  }
};