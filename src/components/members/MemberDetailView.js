import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Spinner,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import axios from '../../utils/axiosConfig';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MemberDetailView = ({ memberId }) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    fetchMemberDetails();
  }, [memberId]);

  const fetchMemberDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/ai/member-insights/${memberId}/`);
      setMember(response.data);
    } catch (error) {
      console.error('Error fetching member details:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!member) {
    return <Text>Member not found</Text>;
  }

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <VStack align="stretch" spacing={6}>
        <Heading size="lg">{member.name}</Heading>
        <HStack>
          <Badge colorScheme={member.churn_risk === 'Low' ? 'green' : member.churn_risk === 'Medium' ? 'yellow' : 'red'}>
            {member.churn_risk} Churn Risk
          </Badge>
          <Text>{member.email}</Text>
        </HStack>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Activity</Tab>
            <Tab>Insights</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Stat>
                  <StatLabel>Membership Duration</StatLabel>
                  <StatNumber>{member.membership_duration} months</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Visit Frequency</StatLabel>
                  <StatNumber>{member.visit_frequency} visits/week</StatNumber>
                  <StatHelpText>
                    <StatArrow type={member.visit_frequency_change > 0 ? 'increase' : 'decrease'} />
                    {Math.abs(member.visit_frequency_change)}% from last month
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Churn Probability</StatLabel>
                  <StatNumber>{(member.churn_probability * 100).toFixed(2)}%</StatNumber>
                </Stat>
              </VStack>
            </TabPanel>
            <TabPanel>
              <Box height="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={member.activity_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visits" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </TabPanel>
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                {member.insights.map((insight, index) => (
                  <Box key={index} p={4} borderWidth={1} borderRadius="md" borderColor={borderColor}>
                    <Text fontWeight="bold">{insight.type}</Text>
                    <Text>{insight.message}</Text>
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