// src/components/AINotifications.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Icon,
  Badge,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';
import axios from 'axios';

const AINotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const bgColor = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
  
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get('/ai/member-insights/');
          // Convert insights to notifications
          const newNotifications = response.data.map((insight, index) => ({
            id: index,
            message: insight.message,
            urgent: insight.type === 'high_risk',
          }));
          setNotifications(newNotifications);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
  
      fetchNotifications();
    }, []);

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button variant="ghost" size="md">
          <Icon as={FiBell} boxSize={5} />
          {notifications.length > 0 && (
            <Badge colorScheme="red" borderRadius="full" ml={1}>
              {notifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent bg={bgColor} borderColor={borderColor}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">AI Notifications</PopoverHeader>
        <PopoverBody>
          <VStack spacing={3} align="stretch">
            {notifications.map((notification) => (
              <Box key={notification.id} p={2} borderWidth={1} borderRadius="md">
                <Text fontSize="sm">
                  {notification.urgent && (
                    <Badge colorScheme="red" mr={2}>
                      Urgent
                    </Badge>
                  )}
                  {notification.message}
                </Text>
              </Box>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AINotifications;