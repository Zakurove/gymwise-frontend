import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge, Button, useColorModeValue, Text, Flex, Icon } from '@chakra-ui/react';
import { FiEye, FiEdit2, FiPauseCircle, FiPlayCircle } from 'react-icons/fi';

const ActiveCampaigns = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  const campaigns = [
    { name: 'Welcome Back', segment: 'Fluctuating', type: 'Email', status: 'Active', performance: '15% open rate' },
    { name: 'Summer Challenge', segment: 'All', type: 'Push', status: 'Scheduled', performance: 'Starts in 2 days' },
    { name: 'Retention Boost', segment: 'Declining', type: 'SMS', status: 'Active', performance: '10% response rate' },
  ];

  return (
    <Box bg={bgColor} p={6} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Active Campaigns</Heading>
        <Button colorScheme="brand" size="sm">View All</Button>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Segment</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Performance</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns.map((campaign, index) => (
              <Tr key={index}>
                <Td fontWeight="medium">{campaign.name}</Td>
                <Td>{campaign.segment}</Td>
                <Td>{campaign.type}</Td>
                <Td>
                  <Badge colorScheme={campaign.status === 'Active' ? 'green' : 'yellow'} borderRadius="full" px={2}>
                    {campaign.status}
                  </Badge>
                </Td>
                <Td>{campaign.performance}</Td>
                <Td>
                  <Flex gap={2}>
                    <Button size="sm" variant="ghost" colorScheme="blue"><Icon as={FiEye} /></Button>
                    <Button size="sm" variant="ghost" colorScheme="green"><Icon as={FiEdit2} /></Button>
                    <Button size="sm" variant="ghost" colorScheme="red">
                      <Icon as={campaign.status === 'Active' ? FiPauseCircle : FiPlayCircle} />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ActiveCampaigns;