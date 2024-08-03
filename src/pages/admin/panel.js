// src/pages/admin/panel.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminPanel from '../../components/admin/AdminPanel';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { useAuthCheck } from '../../hooks/useAuthCheck';

const AdminPanelPage = () => {
  const router = useRouter();
  const { isAuthorized, authChecked, loading } = useAuthCheck();

  useEffect(() => {
    if (authChecked && !isAuthorized) {
      router.push('/dashboard');
    }
  }, [authChecked, isAuthorized, router]);

  if (loading || !authChecked) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!isAuthorized) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="lg" color="red.500">Unauthorized Access</Heading>
        <Text mt={4}>You do not have permission to view this page.</Text>
      </Box>
    );
  }

  return <AdminPanel />;
};

export default AdminPanelPage;