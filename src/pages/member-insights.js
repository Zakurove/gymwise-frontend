import React from 'react';
import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import MemberDistributionChart from '../components/memberInsights/MemberDistributionChart';
import RetentionAlerts from '../components/memberInsights/RetentionAlerts';
import MemberSegmentBreakdown from '../components/memberInsights/MemberSegmentBreakdown';

const MemberInsights = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <Heading mb={2}>Member Insights</Heading>
      <Text mb={6} color={useColorModeValue('gray.600', 'gray.400')}>Analyze member distribution and take action to improve retention.</Text>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={8}>
        <MemberDistributionChart />
        <RetentionAlerts />
      </SimpleGrid>
      
      <MemberSegmentBreakdown />
    </Box>
  );
};

export default MemberInsights;