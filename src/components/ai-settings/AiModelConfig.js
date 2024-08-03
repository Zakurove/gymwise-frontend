// src/components/ai-settings/AIModelConfig.js

import React from 'react';
import { Box, Heading, VStack, FormControl, FormLabel, Select, Switch, Button, useColorModeValue } from '@chakra-ui/react';

const AIModelConfig = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box bg={bgColor} p={8} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="lg" mb={6}>AI Model Configuration</Heading>
      <VStack spacing={6} align="stretch">
        <FormControl>
          <FormLabel>Model Type</FormLabel>
          <Select defaultValue="xgboost">
            <option value="xgboost">XGBoost</option>
            <option value="randomforest">Random Forest</option>
          </Select>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="auto-retrain" mb="0">
            Enable Auto-Retraining
          </FormLabel>
          <Switch id="auto-retrain" />
        </FormControl>
        <FormControl>
          <FormLabel>Retraining Frequency</FormLabel>
          <Select defaultValue="weekly">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </FormControl>
        <Button colorScheme="brand">Save Configuration</Button>
      </VStack>
    </Box>
  );
};

export default AIModelConfig;