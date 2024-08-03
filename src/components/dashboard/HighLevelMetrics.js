import React from 'react';
import { useSelector } from 'react-redux';
import { SimpleGrid, Box, Text, Icon, Flex, useColorModeValue } from '@chakra-ui/react';
import { FiDollarSign, FiUsers, FiPercent, FiStar, FiUserPlus, FiActivity } from 'react-icons/fi';

const HighLevelMetrics = () => {
  const { metrics, loading, error } = useSelector(state => state.metrics);
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  if (loading) {
    return <Text>Loading metrics...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error loading metrics: {error}</Text>;
  }

  const metricIcons = {
    totalRevenue: FiDollarSign,
    activeMembers: FiUsers,
    avgRetentionRate: FiPercent,
    netPromoterScore: FiStar,
    newSignUps: FiUserPlus,
    avgDailyVisits: FiActivity,
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {Object.entries(metrics).map(([key, metric]) => (
        <Box 
          key={key} 
          bg={bgColor} 
          p={6} 
          borderRadius="lg" 
          borderWidth={1} 
          borderColor={borderColor}
          boxShadow="xl"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
        >
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Text fontSize="sm" color={textColor} fontWeight="medium" mb={2}>
                {metric.label}
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color={metric.color}>
                {metric.value}
              </Text>
              <Text fontSize="sm" color={metric.change >= 0 ? "green.500" : "red.500"} mt={2}>
                {metric.change >= 0 ? "↑" : "↓"} {Math.abs(metric.change)}%
              </Text>
            </Box>
            <Box p={3} bg={`${metric.color}20`} borderRadius="full">
              <Icon as={metricIcons[key]} w={6} h={6} color={metric.color} />
            </Box>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default HighLevelMetrics;