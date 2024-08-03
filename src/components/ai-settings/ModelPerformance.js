// src/components/ai-settings/ModelPerformance.js

import React from 'react';
import { Box, Heading, VStack, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Button, useColorModeValue } from '@chakra-ui/react';

const ModelPerformance = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const metrics = [
    { label: 'Accuracy', value: 0.92, change: 0.03, increase: true },
    { label: 'Precision', value: 0.89, change: 0.02, increase: true },
    { label: 'Recall', value: 0.94, change: 0.01, increase: false },
    { label: 'F1 Score', value: 0.91, change: 0.02, increase: true },
  ];

  return (
    <Box bg={bgColor} p={8} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="lg" mb={6}>Model Performance</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        {metrics.map((metric, index) => (
          <Stat key={index}>
            <StatLabel>{metric.label}</StatLabel>
            <StatNumber>{metric.value.toFixed(2)}</StatNumber>
            <StatHelpText>
              <StatArrow type={metric.increase ? 'increase' : 'decrease'} />
              {metric.change.toFixed(2)}
            </StatHelpText>
          </Stat>
        ))}
      </SimpleGrid>
      <Text mb={4}>Last trained: 2023-05-15 09:30 AM</Text>
      <Button colorScheme="brand">Retrain Model</Button>
    </Box>
  );
};

export default ModelPerformance;