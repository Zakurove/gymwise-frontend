import React from 'react';
import { SimpleGrid, Box, Text, Icon, Flex, useColorModeValue } from '@chakra-ui/react';
import { FiDollarSign, FiUsers, FiPercent, FiStar, FiUserPlus, FiActivity } from 'react-icons/fi';

const HighLevelMetrics = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  const metrics = [
    { label: "Total Revenue", value: "$250,000", change: 8.2, increase: true, icon: FiDollarSign, color: "green.500" },
    { label: "Active Members", value: "1,200", change: 4.5, increase: true, icon: FiUsers, color: "blue.500" },
    { label: "Avg. Retention Rate", value: "85%", change: 2.3, increase: true, icon: FiPercent, color: "purple.500" },
    { label: "Net Promoter Score", value: "72", change: 5.1, increase: true, icon: FiStar, color: "orange.500" },
    { label: "New Sign-ups", value: "120", change: 2.5, increase: false, icon: FiUserPlus, color: "teal.500" },
    { label: "Avg. Daily Visits", value: "345", change: 5.2, increase: true, icon: FiActivity, color: "pink.500" },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {metrics.map((metric, index) => (
        <Box 
          key={index} 
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
              <Text fontSize="sm" color={metric.increase ? "green.500" : "red.500"} mt={2}>
                {metric.increase ? "↑" : "↓"} {Math.abs(metric.change)}%
              </Text>
            </Box>
            <Box p={3} bg={`${metric.color}20`} borderRadius="full">
              <Icon as={metric.icon} w={6} h={6} color={metric.color} />
            </Box>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default HighLevelMetrics;