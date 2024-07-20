import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge, Button, useColorModeValue } from '@chakra-ui/react';
import { FiEye } from 'react-icons/fi';

const ActiveCampaigns = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  const campaigns = [
    { name: 'Welcome Back', segment: 'Fluctuating', type: 'Email', status: 'Active', performance: '15% open rate' },
    { name: 'Summer Challenge', segment: 'All', type: 'Push', status: 'Scheduled', performance: 'Starts in 2 days' },
    { name: 'Retention Boost', segment: 'Declining', type: 'SMS', status: 'Active', performance: '10% response rate' },
  ];

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="md" mb={6}>Active Campaigns</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Segment</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Performance</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns.map((campaign, index) => (
              <Tr key={index}>
                <Td fontWeight="medium">{campaign.name}</Td>
                <Td>{campaign.segment}</Td>
                <Td>{campaign.type}</Td>
                <Td>
                  <Badge colorScheme={campaign.status === 'Active' ? 'green' : 'yellow'}>
                    {campaign.status}
                  </Badge>
                </Td>
                <Td>{campaign.performance}</Td>
                <Td>
                  <Button leftIcon={<FiEye />} size="sm" variant="outline">View</Button>
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