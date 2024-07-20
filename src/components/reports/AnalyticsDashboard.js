import React from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Icon, Flex, useColorModeValue } from '@chakra-ui/react';
import { FiDollarSign, FiUsers, FiPercent, FiStar } from 'react-icons/fi';

const AnalyticsDashboard = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  const stats = [
    { label: 'Total Revenue', value: '$250,000', change: 8.2, increase: true, icon: FiDollarSign, color: 'green.500' },
    { label: 'Active Members', value: '1,200', change: 4.5, increase: true, icon: FiUsers, color: 'blue.500' },
    { label: 'Avg. Retention Rate', value: '85%', change: 2.3, increase: true, icon: FiPercent, color: 'purple.500' },
    { label: 'Net Promoter Score', value: '72', change: 5.1, increase: true, icon: FiStar, color: 'orange.500' },
  ];

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="md" mb={6}>Analytics Overview</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {stats.map((stat, index) => (
          <Box key={index} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
            <Stat>
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <StatLabel>{stat.label}</StatLabel>
                <Icon as={stat.icon} color={stat.color} boxSize={6} />
              </Flex>
              <StatNumber fontSize="2xl" fontWeight="bold" color={stat.color}>{stat.value}</StatNumber>
              <StatHelpText>
                <StatArrow type={stat.increase ? 'increase' : 'decrease'} />
                {stat.change}%
              </StatHelpText>
            </Stat>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AnalyticsDashboard;