import axios from '../../utils/axiosConfig';
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  activateUserSuccess,
  changeUserRoleSuccess,
} from './adminSlice';

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersStart());
  try {
    const response = await axios.get('/api/institution-users/');
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(fetchUsersFailure('Unauthorized: Please check your login status and permissions.'));
    } else {
      dispatch(fetchUsersFailure(error.response?.data?.message || 'An error occurred while fetching users'));
    }
  }
};

export const activateUser = (userId) => async (dispatch) => {
  try {
    await axios.post(`/api/activate-user/${userId}/`);
    dispatch(activateUserSuccess(userId));
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred while activating the user');
  }
};

export const changeUserRole = (userId, newRole) => async (dispatch) => {
  try {
    await axios.post('/api/manage-roles/', { user_id: userId, role: newRole });
    dispatch(changeUserRoleSuccess({ userId, newRole }));
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred while changing the user role');
  }
};