import React from 'react';
import { Box, Heading, VStack, FormControl, FormLabel, Input, Select, Textarea, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiSend, FiUsers, FiBell, FiMessageSquare } from 'react-icons/fi';

const CampaignCreator = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="md" mb={6}>Create New Campaign</Heading>
      <VStack spacing={6} as="form">
        <FormControl>
          <FormLabel>Campaign Name</FormLabel>
          <Input placeholder="Enter campaign name" />
        </FormControl>
        <FormControl>
          <FormLabel>Target Segment</FormLabel>
          <Select placeholder="Select target segment" icon={<Icon as={FiUsers} />}>
            <option value="thriving">Thriving</option>
            <option value="fluctuating">Fluctuating</option>
            <option value="declining">Declining</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Campaign Type</FormLabel>
          <Select placeholder="Select campaign type" icon={<Icon as={FiBell} />}>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push Notification</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Message</FormLabel>
          <Textarea placeholder="Enter campaign message" />
        </FormControl>
        <Button leftIcon={<FiSend />} colorScheme="blue" width="full">Create Campaign</Button>
      </VStack>
    </Box>
  );
};

export default CampaignCreator;