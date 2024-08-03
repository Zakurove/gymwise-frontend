import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, Text, SimpleGrid, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiTrendingUp, FiUserCheck, FiDollarSign, FiAward } from 'react-icons/fi';

const PerformanceOverview = () => {
  const { performanceData, loading, error } = useSelector(state => state.performance);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  if (loading) {
    return <Text>Loading performance data...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error loading performance data: {error}</Text>;
  }

  const icons = {
    revenueGrowth: FiTrendingUp,
    memberRetention: FiUserCheck,
    avgRevenuePerMember: FiDollarSign,
    customerSatisfaction: FiAward,
  };

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="md" mb={6}>Performance Overview</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {Object.entries(performanceData).map(([key, item]) => (
          <Box 
            key={key} 
            borderRadius="md" 
            overflow="hidden"
            position="relative"
          >
            <Box 
              bg={`${item.color}20`} 
              p={4} 
              position="relative" 
              zIndex={1}
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color={textColor}>
                    {item.label}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color={item.color}>
                    {item.value}
                  </Text>
                </Box>
                <Icon as={icons[key]} color={item.color} boxSize={8} />
              </Flex>
            </Box>
            <Box 
              position="absolute" 
              bottom={0} 
              left={0} 
              right={0} 
              height={`${parseFloat(item.value)}%`} 
              bg={`${item.color}40`} 
              transition="height 0.3s ease-in-out"
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PerformanceOverview;