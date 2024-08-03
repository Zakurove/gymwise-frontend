import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, SimpleGrid, Text, useColorModeValue, VStack, Spinner } from '@chakra-ui/react';
import MemberDistributionChart from '../components/memberInsights/MemberDistributionChart';
import RetentionAlerts from '../components/memberInsights/RetentionAlerts';
import MemberSegmentBreakdown from '../components/memberInsights/MemberSegmentBreakdown';
import WhatIfScenario from '../components/memberInsights/WhatIfScenario';
import { fetchMemberInsights, fetchChurnDistribution, fetchMemberSegments } from '../redux/members/membersActions';

const MemberInsights = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { memberInsights, churnDistribution, memberSegments, loading, error } = useSelector(state => state.members);
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    dispatch(fetchMemberInsights());
    dispatch(fetchChurnDistribution());
    dispatch(fetchMemberSegments());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="lg" color="red.500">Error: {error}</Heading>
      </Box>
    );
  }

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={2} size="2xl" color="brand.500">Member Insights</Heading>
          <Text mb={6} color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
            Leverage our AI-powered analytics to understand and improve member retention for {user.institution_name}.
          </Text>
        </Box>
        
        {churnDistribution && <MemberDistributionChart data={churnDistribution} />}
        
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {memberInsights && <RetentionAlerts insights={memberInsights} />}
          {memberSegments && <MemberSegmentBreakdown segments={memberSegments} />}
        </SimpleGrid>

        <WhatIfScenario />
      </VStack>
    </Box>
  );
};

export default MemberInsights;