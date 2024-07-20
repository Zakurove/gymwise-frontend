import React from 'react';
import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Layout } from '../components/layout/Layout';
import HighLevelMetrics from '../components/dashboard/HighLevelMetrics';
import RevenueChart from '../components/dashboard/RevenueChart';
import QuickInsights from '../components/dashboard/QuickInsights';
// import MemberChurnPrediction from '../components/dashboard/MemberChurnPrediction';
// import ActiveUsersChart from '../components/dashboard/ActiveUsersChart';

const Dashboard = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading size="lg">Dashboard</Heading>
        <Text color="gray.500">Welcome back, John Doe</Text>
      </Flex>
      
      <HighLevelMetrics />
      
      {/* <Flex direction={{ base: 'column', lg: 'row' }} gap={8} mt={8}>
        <Box flex={1}>
          <MemberChurnPrediction />
        </Box>
        <Box flex={1}>
          <ActiveUsersChart />
        </Box>
      </Flex> */}
      
      <Flex direction={{ base: 'column', lg: 'row' }} gap={8} mt={8}>
        <Box flex={1}>
          <RevenueChart />
        </Box>
        <Box flex={1}>
          <QuickInsights />
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;