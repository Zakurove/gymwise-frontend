import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, Text, VStack, HStack, Icon, Flex, Badge, useColorModeValue } from '@chakra-ui/react';
import { FiTrendingUp, FiAlertCircle, FiCheckCircle, FiUsers } from 'react-icons/fi';

const QuickInsights = () => {
  const { insights, loading, error } = useSelector(state => state.insights);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  if (loading) {
    return <Text>Loading insights...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error loading insights: {error}</Text>;
  }

  const icons = {
    revenue: FiTrendingUp,
    retention: FiAlertCircle,
    engagement: FiUsers,
  };

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
                <Icon as={icons[insight.category] || FiCheckCircle} color={insight.color} boxSize={6} />
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