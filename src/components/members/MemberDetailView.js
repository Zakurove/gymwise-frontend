import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Heading, Text, VStack, HStack, Badge, Spinner, useColorModeValue,
  Stat, StatLabel, StatNumber, StatHelpText, StatArrow,
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import { fetchMemberDetail } from '../../redux/members/membersActions';

const MemberDetailView = ({ memberId }) => {
  const dispatch = useDispatch();
  const { selectedMember, loading, error } = useSelector(state => state.members);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    dispatch(fetchMemberDetail(memberId));
  }, [dispatch, memberId]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  if (!selectedMember) {
    return <Text>Member not found</Text>;
  }

  const { member_info, insights, actionable_insights } = selectedMember;

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <VStack align="stretch" spacing={6}>
        <Heading size="lg">{member_info.name}</Heading>
        <HStack>
          <Badge colorScheme={member_info.churn_risk === 'high' ? 'red' : member_info.churn_risk === 'medium' ? 'yellow' : 'green'}>
            {member_info.churn_risk} Churn Risk
          </Badge>
          <Text>{member_info.email}</Text>
        </HStack>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Insights</Tab>
            <Tab>Actionable Insights</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Stat>
                  <StatLabel>Membership Duration</StatLabel>
                  <StatNumber>{member_info.membership_duration} months</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Visit Frequency</StatLabel>
                  <StatNumber>{member_info.visit_frequency} visits/week</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Churn Probability</StatLabel>
                  <StatNumber>{(member_info.churn_probability * 100).toFixed(2)}%</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Join Date</StatLabel>
                  <StatNumber>{new Date(member_info.join_date).toLocaleDateString()}</StatNumber>
                </Stat>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                {insights.map((insight, index) => (
                  <Box key={index} p={4} borderWidth={1} borderRadius="md" borderColor={borderColor}>
                    <Text fontWeight="bold">{insight.type}</Text>
                    <Text>{insight.message}</Text>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                {actionable_insights.map((insight, index) => (
                  <Box key={index} p={4} borderWidth={1} borderRadius="md" borderColor={borderColor}>
                    <Text fontWeight="bold">{insight.type}</Text>
                    <Text>{insight.message}</Text>
                    <Text fontSize="sm" color="gray.500">Created: {new Date(insight.created_at).toLocaleString()}</Text>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default MemberDetailView;