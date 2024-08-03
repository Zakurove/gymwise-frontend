import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import AIModelConfig from '../components/ai-settings/AIModelConfig';
import PredictionThresholds from '../components/ai-settings/PredictionThresholds';
import FeatureImportance from '../components/ai-settings/FeatureImportance';
import ModelPerformance from '../components/ai-settings/ModelPerformance';

const AISettings = () => {
  const { user } = useSelector(state => state.auth);
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={2} color="brand.500">AI Settings & Configuration</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Customize and optimize AI model settings for {user.institution_name}.
          </Text>
        </Box>

        <AIModelConfig />
        <PredictionThresholds />
        <FeatureImportance />
        <ModelPerformance />
      </VStack>
    </Box>
  );
};

export default AISettings;