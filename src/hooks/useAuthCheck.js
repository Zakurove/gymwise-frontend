// src/hooks/useAuthCheck.js
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/auth/authActions';

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user && !loading) {
        await dispatch(fetchUser());
      }
      
      if (!loading) {
        setIsAuthorized(user && (user.role === 'admin' || user.role === 'superadmin'));
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [user, loading, dispatch]);

  return { isAuthorized, authChecked, user, loading };
};