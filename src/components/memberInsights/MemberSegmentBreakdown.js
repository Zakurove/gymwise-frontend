// src/components/memberInsights/MemberSegmentBreakdown.js

import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Flex, Text, Progress, Icon } from '@chakra-ui/react';
import { FiTrendingUp, FiTrendingDown, FiMinusCircle } from 'react-icons/fi';

const MemberSegmentBreakdown = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const headerBgColor = useColorModeValue('gray.50', 'gray.600');

  const segments = [
    { name: 'Thriving', count: 600, avgVisits: 12, retentionRate: 95, color: '#48BB78', icon: FiTrendingUp },
    { name: 'Fluctuating', count: 300, avgVisits: 8, retentionRate: 75, color: '#ECC94B', icon: FiMinusCircle },
    { name: 'Declining', count: 100, avgVisits: 3, retentionRate: 40, color: '#F56565', icon: FiTrendingDown },
  ];

  return (
    <Box bg={bgColor} p={6} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="2xl">
      <Heading size="lg" mb={6} color="brand.500">Member Segment Breakdown</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr bg={headerBgColor}>
              <Th>Segment</Th>
              <Th isNumeric>Count</Th>
              <Th isNumeric>Avg. Visits/Month</Th>
              <Th>Retention Rate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {segments.map((segment) => (
              <Tr key={segment.name}>
                <Td>
                  <Flex align="center">
                    <Icon as={segment.icon} color={segment.color} mr={2} />
                    <Text fontWeight="bold" color={segment.color}>{segment.name}</Text>
                  </Flex>
                </Td>
                <Td isNumeric fontWeight="bold">{segment.count}</Td>
                <Td isNumeric>{segment.avgVisits}</Td>
                <Td>
                  <Flex align="center">
                    <Box w="70%" mr={4}>
                      <Progress value={segment.retentionRate} colorScheme={segment.color.replace('#', '')} size="sm" borderRadius="full" />
                    </Box>
                    <Text fontWeight="bold">{segment.retentionRate}%</Text>
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

export default MemberSegmentBreakdown;