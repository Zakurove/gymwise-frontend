import React from 'react';
import { Box, Heading, VStack, HStack, Text, Icon, Badge, useColorModeValue } from '@chakra-ui/react';
import { FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';

const RetentionAlerts = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const alerts = [
    { message: "15 members haven't visited in 30 days", urgent: true, icon: FiAlertCircle },
    { message: '5 "Declining" members showed increased activity this week', urgent: false, icon: FiCheckCircle },
    { message: '10 memberships are expiring in the next 7 days', urgent: true, icon: FiClock },
  ];

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="md" mb={4}>Retention Alerts</Heading>
      <VStack spacing={4} align="stretch">
        {alerts.map((alert, index) => (
          <Box 
            key={index} 
            p={4} 
            borderRadius="md" 
            borderWidth={1} 
            borderColor={borderColor}
            bg={alert.urgent ? 'red.50' : 'green.50'}
            _dark={{
              bg: alert.urgent ? 'rgba(254, 178, 178, 0.06)' : 'rgba(154, 230, 180, 0.06)'
            }}
          >
            <HStack spacing={4}>
              <Icon as={alert.icon} color={alert.urgent ? 'red.500' : 'green.500'} boxSize={6} />
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">{alert.message}</Text>
                <Badge colorScheme={alert.urgent ? 'red' : 'green'} mt={1}>
                  {alert.urgent ? 'Urgent' : 'Positive'}
                </Badge>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default RetentionAlerts;