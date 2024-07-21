import React from 'react';
import { Box, Heading, Text, VStack, HStack, Icon, Flex, Badge, useColorModeValue } from '@chakra-ui/react';
import { FiTrendingUp, FiAlertCircle, FiCheckCircle, FiUsers, FiDollarSign } from 'react-icons/fi';

const QuickInsights = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const insights = [
    { icon: FiTrendingUp, text: "Revenue increased by 12%", subtext: "Compared to last month", positive: true, color: "green.500", category: "Revenue" },
    { icon: FiAlertCircle, text: "15 members at risk", subtext: "Haven't visited in the last 30 days", positive: false, color: "red.500", category: "Retention" },
    { icon: FiCheckCircle, text: "Retention rate improved by 5%", subtext: "This quarter", positive: true, color: "blue.500", category: "Retention" },
    { icon: FiUsers, text: "20% increase in class attendance", subtext: "Over the past week", positive: true, color: "purple.500", category: "Engagement" },
  ];

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="md" mb={6}>Quick Insights</Heading>
      <VStack align="stretch" spacing={4}>
        {insights.map((insight, index) => (
          <Box 
            key={index} 
            p={4} 
            borderRadius="md" 
            borderWidth={1} 
            borderColor={borderColor}
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <HStack spacing={4}>
                <Icon as={insight.icon} color={insight.color} boxSize={6} />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">{insight.text}</Text>
                  <Text fontSize="sm" color={textColor}>{insight.subtext}</Text>
                </VStack>
              </HStack>
              <Badge colorScheme={insight.positive ? "green" : "red"}>
                {insight.positive ? "Positive" : "Needs Attention"}
              </Badge>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default QuickInsights;