// src/components/ai-settings/FeatureImportance.js

import React from 'react';
import { Box, Heading, VStack, Text, Progress, HStack, useColorModeValue } from '@chakra-ui/react';

const FeatureImportance = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const features = [
    { name: 'Visit Frequency', importance: 0.35 },
    { name: 'Membership Duration', importance: 0.25 },
    { name: 'Age', importance: 0.15 },
    { name: 'Class Attendance', importance: 0.12 },
    { name: 'Payment History', importance: 0.08 },
    { name: 'Gender', importance: 0.05 },
  ];

  return (
    <Box bg={bgColor} p={8} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="lg" mb={6}>Feature Importance</Heading>
      <VStack spacing={4} align="stretch">
        {features.map((feature, index) => (
          <Box key={index}>
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="medium">{feature.name}</Text>
              <Text>{(feature.importance * 100).toFixed(1)}%</Text>
            </HStack>
            <Progress value={feature.importance * 100} size="sm" colorScheme="brand" />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default FeatureImportance;