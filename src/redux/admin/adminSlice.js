import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    activateUserSuccess: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload);
      if (index !== -1) {
        state.users[index].is_active = true;
      }
    },
    changeUserRoleSuccess: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.userId);
      if (index !== -1) {
        state.users[index].role = action.payload.newRole;
      }
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  activateUserSuccess,
  changeUserRoleSuccess,
} = adminSlice.actions;

export default adminSlice.reducer;