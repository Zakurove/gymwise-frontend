// src/components/engagement/CampaignInsights.js

import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

const CampaignInsights = () => {
  const [insights, setInsights] = useState([]);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get('/ai/campaign-insights/');
        setInsights(response.data);
      } catch (error) {
        console.error('Error fetching campaign insights:', error);
      }
    };
    fetchInsights();
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      {insights.map((stat, index) => (
        <Box key={index} bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="md">
          <Stat>
            <StatLabel fontSize="sm" fontWeight="medium">{stat.label}</StatLabel>
            <StatNumber fontSize="3xl" fontWeight="bold">{stat.value}</StatNumber>
            <StatHelpText>
              <StatArrow type={stat.change > 0 ? 'increase' : 'decrease'} />
              {Math.abs(stat.change)}%
            </StatHelpText>
          </Stat>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default CampaignInsights;