import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  SimpleGrid, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  StatArrow, 
  Icon, 
  Flex,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react";
import { FiDollarSign, FiUsers, FiPercent, FiStar, FiUserPlus, FiActivity } from "react-icons/fi";
import HighLevelMetrics from '../components/dashboard/HighLevelMetrics';
import RevenueChart from '../components/dashboard/RevenueChart';
import QuickInsights from '../components/dashboard/QuickInsights';
import PerformanceOverview from '../components/dashboard/PerformanceOverview';
import { fetchRevenue } from '../redux/revenue/revenueActions';
import { fetchMetrics } from '../redux/metrics/metricsActions';
import { fetchInsights } from '../redux/insights/insightsActions';
import { fetchPerformance } from '../redux/performance/performanceActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading: metricsLoading, error: metricsError } = useSelector(state => state.metrics);
  const { loading: revenueLoading, error: revenueError } = useSelector(state => state.revenue);
  const { loading: insightsLoading, error: insightsError } = useSelector(state => state.insights);
  const { loading: performanceLoading, error: performanceError } = useSelector(state => state.performance);

  const bgColor = useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    dispatch(fetchMetrics());
    dispatch(fetchRevenue());
    dispatch(fetchInsights());
    dispatch(fetchPerformance());
  }, [dispatch]);

  const isLoading = metricsLoading || revenueLoading || insightsLoading || performanceLoading;
  const hasError = metricsError || revenueError || insightsError || performanceError;

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (hasError) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="lg" color="red.500">Error loading dashboard data</Heading>
        <Text mt={4}>{metricsError || revenueError || insightsError || performanceError}</Text>
      </Box>
    );
  }

  // Mock data for AI-driven metrics (replace with actual data from your Redux store)
  const aiMetrics = [
    { label: "Predicted Churn Rate", value: "7.2%", icon: FiUsers, change: -2.5, color: "green.500" },
    { label: "Avg. Engagement Score", value: "8.4/10", icon: FiStar, change: 0.3, color: "blue.500" },
    { label: "Retention Forecast", value: "92%", icon: FiPercent, change: 1.5, color: "purple.500" },
    { label: "AI-Suggested Campaigns", value: "3", icon: FiActivity, color: "orange.500" },
  ];

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size="xl" color="brand.500">Dashboard</Heading>
            <Text color="gray.500" fontWeight="medium">
              Welcome back, {user.first_name} | {user.institution_name}
            </Text>
          </Box>
        </Flex>
        
        <HighLevelMetrics />
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {aiMetrics.map((metric, index) => (
            <Stat
              key={index}
              px={4}
              py={5}
              shadow="xl"
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.500')}
              rounded="lg"
              bg={useColorModeValue('white', 'gray.700')}
            >
              <Flex justifyContent="space-between">
                <Box pl={3}>
                  <StatLabel fontWeight="medium" isTruncated>
                    {metric.label}
                  </StatLabel>
                  <StatNumber fontSize="2xl" fontWeight="medium">
                    {metric.value}
                  </StatNumber>
                  {metric.change && (
                    <StatHelpText>
                      <StatArrow type={metric.change > 0 ? 'increase' : 'decrease'} />
                      {Math.abs(metric.change)}%
                    </StatHelpText>
                  )}
                </Box>
                <Box
                  my="auto"
                  color={useColorModeValue('gray.800', 'gray.200')}
                  alignContent="center"
                >
                  <Icon as={metric.icon} w={8} h={8} />
                </Box>
              </Flex>
            </Stat>
          ))}
        </SimpleGrid>
        
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