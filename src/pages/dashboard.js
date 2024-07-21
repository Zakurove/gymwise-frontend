import React from 'react';
import { Box, Flex, Heading, Text, useColorModeValue, VStack, SimpleGrid } from '@chakra-ui/react';
import HighLevelMetrics from '../components/dashboard/HighLevelMetrics';
import RevenueChart from '../components/dashboard/RevenueChart';
import QuickInsights from '../components/dashboard/QuickInsights';
import PerformanceOverview from '../components/dashboard/PerformanceOverview';

const Dashboard = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="xl" color="brand.500">Dashboard</Heading>
          <Text color="gray.500" fontWeight="medium">Welcome back, John Doe</Text>
        </Flex>
        
        <HighLevelMetrics />
        
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <RevenueChart />
          <PerformanceOverview />
        </SimpleGrid>
        
        <QuickInsights />
      </VStack>
    </Box>
  );
};

export default Dashboard;