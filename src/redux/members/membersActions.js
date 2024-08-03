import {
  fetchMembersStart,
  fetchMembersSuccess,
  fetchMembersFailure,
  fetchMemberInsightsSuccess,
  fetchChurnDistributionSuccess,
  fetchMemberSegmentsSuccess,
} from './membersSlice';
import { 
  mockMemberInsights, 
  mockChurnDistribution, 
  mockMemberSegments 
} from '../../utils/mockData';

export const fetchMembers = () => async (dispatch) => {
  dispatch(fetchMembersStart());
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // For now, we'll just return an empty array as we don't have mock data for all members
    dispatch(fetchMembersSuccess([]));
  } catch (error) {
    dispatch(fetchMembersFailure('Failed to fetch members'));
  }
};

export const fetchMemberInsights = () => async (dispatch) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(fetchMemberInsightsSuccess(mockMemberInsights));
    return mockMemberInsights;
  } catch (error) {
    console.error('Failed to fetch member insights:', error);
    throw error;
  }
};

export const fetchChurnDistribution = () => async (dispatch) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(fetchChurnDistributionSuccess(mockChurnDistribution));
    return mockChurnDistribution;
  } catch (error) {
    console.error('Failed to fetch churn distribution:', error);
    throw error;
  }
};

export const fetchMemberSegments = () => async (dispatch) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(fetchMemberSegmentsSuccess(mockMemberSegments));
    return mockMemberSegments;
  } catch (error) {
    console.error('Failed to fetch member segments:', error);
    throw error;
  }
};