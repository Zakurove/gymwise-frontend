import {
  fetchMetricsStart,
  fetchMetricsSuccess,
  fetchMetricsFailure,
} from './metricsSlice';
import { mockMetrics } from '../../utils/mockData';

export const fetchMetrics = () => async (dispatch) => {
  dispatch(fetchMetricsStart());
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(fetchMetricsSuccess(mockMetrics));
    return mockMetrics;
  } catch (error) {
    dispatch(fetchMetricsFailure('Failed to fetch metrics'));
    throw error;
  }
};