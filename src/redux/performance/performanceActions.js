import {
  fetchPerformanceStart,
  fetchPerformanceSuccess,
  fetchPerformanceFailure,
} from './performanceSlice';
import { mockPerformance } from '../../utils/mockData';

export const fetchPerformance = () => async (dispatch) => {
  dispatch(fetchPerformanceStart());
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(fetchPerformanceSuccess(mockPerformance));
    return mockPerformance;
  } catch (error) {
    dispatch(fetchPerformanceFailure('Failed to fetch performance data'));
    throw error;
  }
};