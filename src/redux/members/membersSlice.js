import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [],
  memberInsights: null,
  churnDistribution: null,
  memberSegments: null,
  loading: false,
  error: null,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    fetchMembersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMembersSuccess: (state, action) => {
      state.loading = false;
      state.members = action.payload;
    },
    fetchMembersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMemberInsightsSuccess: (state, action) => {
      state.memberInsights = action.payload;
    },
    fetchChurnDistributionSuccess: (state, action) => {
      state.churnDistribution = action.payload;
    },
    fetchMemberSegmentsSuccess: (state, action) => {
      state.memberSegments = action.payload;
    },
  },
});

export const {
  fetchMembersStart,
  fetchMembersSuccess,
  fetchMembersFailure,
  fetchMemberInsightsSuccess,
  fetchChurnDistributionSuccess,
  fetchMemberSegmentsSuccess,
} = membersSlice.actions;

export default membersSlice.reducer;