import React from 'react';
import { Box, Heading, SimpleGrid, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import MemberDistributionChart from '../components/memberInsights/MemberDistributionChart';
import RetentionAlerts from '../components/memberInsights/RetentionAlerts';
import MemberSegmentBreakdown from '../components/memberInsights/MemberSegmentBreakdown';

const MemberInsights = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={2} size="2xl" color="brand.500">Member Insights</Heading>
          <Text mb={6} color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
            Leverage our AI-powered analytics to understand and improve member retention.
          </Text>
        </Box>
        
        <MemberDistributionChart />
        
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <RetentionAlerts />
          <MemberSegmentBreakdown />
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default MemberInsights;