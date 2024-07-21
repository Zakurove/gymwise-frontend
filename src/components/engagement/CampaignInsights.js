import React from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorModeValue } from '@chakra-ui/react';

const CampaignInsights = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  const stats = [
    { label: 'Total Campaigns', value: '12', change: 20, increase: true },
    { label: 'Active Members Reached', value: '1,234', change: 5, increase: true },
    { label: 'Avg. Engagement Rate', value: '32%', change: 3, increase: true },
    { label: 'ROI', value: '280%', change: 12, increase: true },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      {stats.map((stat, index) => (
        <Box key={index} bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="md">
          <Stat>
            <StatLabel fontSize="sm" fontWeight="medium">{stat.label}</StatLabel>
            <StatNumber fontSize="3xl" fontWeight="bold">{stat.value}</StatNumber>
            <StatHelpText>
              <StatArrow type={stat.increase ? 'increase' : 'decrease'} />
              {stat.change}%
            </StatHelpText>
          </Stat>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default CampaignInsights;