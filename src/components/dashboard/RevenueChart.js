import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, Flex, Text, HStack, VStack, Icon, useColorModeValue, Spinner } from '@chakra-ui/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiDollarSign } from 'react-icons/fi';

const RevenueChart = () => {
  const { revenueData, loading, error } = useSelector(state => state.revenue);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  if (loading) {
    return (
      <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
        <Flex justify="center" align="center" height="300px">
          <Spinner size="xl" />
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
        <Text color="red.500">Error loading revenue data: {error}</Text>
      </Box>
    );
  }

  if (!revenueData || revenueData.length === 0) {
    return (
      <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
        <Text>No revenue data available.</Text>
      </Box>
    );
  }

  const currentYearTotal = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const lastYearTotal = revenueData.reduce((sum, item) => sum + item.lastYear, 0);
  const growthRate = ((currentYearTotal - lastYearTotal) / lastYearTotal * 100).toFixed(1);

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="md">Revenue Overview</Heading>
        <HStack spacing={4}>
          <VStack align="flex-end" spacing={0}>
            <Text fontSize="sm" color={textColor}>Total Revenue</Text>
            <Text fontWeight="bold" fontSize="xl">${currentYearTotal.toLocaleString()}</Text>
          </VStack>
          <Box p={2} bg="green.100" borderRadius="full">
            <Icon as={FiTrendingUp} color="green.500" boxSize={6} />
          </Box>
        </HStack>
      </Flex>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="#319795" fill="#319795" fillOpacity={0.3} />
          <Area type="monotone" dataKey="lastYear" stroke="#718096" fill="#718096" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
      <Flex justifyContent="space-between" alignItems="center" mt={6}>
        <HStack spacing={4}>
          <Box w={4} h={4} bg="#319795" borderRadius="full" />
          <Text fontWeight="medium" color="brand.500">This Year</Text>
        </HStack>
        <HStack spacing={4}>
          <Box w={4} h={4} bg="#718096" borderRadius="full" />
          <Text fontWeight="medium" color="gray.500">Last Year</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FiDollarSign} color="green.500" />
          <Text fontWeight="bold" color="green.500">{growthRate}% Growth</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default RevenueChart;