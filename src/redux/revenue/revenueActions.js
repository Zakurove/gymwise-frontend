import {
    fetchRevenueStart,
    fetchRevenueSuccess,
    fetchRevenueFailure,
  } from './revenueSlice';
  import { mockRevenue } from '../../utils/mockData';
  
  export const fetchRevenue = () => async (dispatch) => {
    dispatch(fetchRevenueStart());
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch(fetchRevenueSuccess(mockRevenue));
      return mockRevenue;
    } catch (error) {
      dispatch(fetchRevenueFailure('Failed to fetch revenue data'));
      throw error;
    }
  };