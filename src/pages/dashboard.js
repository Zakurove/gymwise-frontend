import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!user) {
    return null; // This will prevent any flash of content before redirect
  }

  return (
    <Box maxW="container.xl" mx="auto" mt={10}>
      <Heading mb={6}>Dashboard</Heading>
      <Text>Welcome, {user.first_name}! This is your dashboard.</Text>
      {/* Add more dashboard content here */}
    </Box>
  );
};

export default Dashboard;