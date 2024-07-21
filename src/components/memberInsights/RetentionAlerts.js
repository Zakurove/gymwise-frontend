import React from 'react';
import { Box, Heading, VStack, HStack, Text, Icon, Badge, Button, useColorModeValue } from '@chakra-ui/react';
import { FiAlertCircle, FiCheckCircle, FiClock, FiArrowRight } from 'react-icons/fi';

const RetentionAlerts = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  const alerts = [
    { message: "15 members haven't visited in 30 days", urgent: true, icon: FiAlertCircle, action: "Send Re-engagement Email" },
    { message: '5 "Declining" members showed increased activity this week', urgent: false, icon: FiCheckCircle, action: "Review Improvement" },
    { message: '10 memberships are expiring in the next 7 days', urgent: true, icon: FiClock, action: "Offer Renewal Incentive" },
  ];

  return (
    <Box bg={bgColor} p={6} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="lg" mb={6} color="brand.500" fontWeight="bold">AI-Powered Retention Alerts</Heading>
      <VStack spacing={4} align="stretch">
        {alerts.map((alert, index) => (
          <Box 
            key={index} 
            p={4} 
            borderRadius="lg" 
            borderWidth={1}
            borderColor={alert.urgent ? 'red.300' : 'green.300'}
            bg={alert.urgent ? 'red.50' : 'green.50'}
            _dark={{
              bg: alert.urgent ? 'rgba(254, 178, 178, 0.1)' : 'rgba(154, 230, 180, 0.1)'
            }}
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
          >
            <HStack spacing={4} justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon 
                  as={alert.icon} 
                  color={alert.urgent ? 'red.500' : 'green.500'} 
                  boxSize={6} 
                  bg={alert.urgent ? 'red.100' : 'green.100'} 
                  p={1} 
                  borderRadius="full"
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold" fontSize="md">{alert.message}</Text>
                  <Badge 
                    colorScheme={alert.urgent ? 'red' : 'green'} 
                    variant="subtle"
                    fontSize="xs"
                    borderRadius="full"
                    px={2}
                    py={0.5}
                  >
                    {alert.urgent ? 'URGENT' : 'POSITIVE'}
                  </Badge>
                </VStack>
              </HStack>
              <Button 
                rightIcon={<FiArrowRight />} 
                colorScheme={alert.urgent ? 'red' : 'green'} 
                size="sm" 
                fontWeight="medium"
                borderRadius="full"
                px={8}
                _hover={{
                  transform: 'translateX(2px)',
                  boxShadow: 'sm'
                }}
              >
                {alert.action}
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default RetentionAlerts;