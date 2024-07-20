import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue } from '@chakra-ui/react';

const MemberSegmentBreakdown = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const headerBgColor = useColorModeValue('gray.50', 'gray.600');

  const segments = [
    { name: 'Thriving', count: 600, avgVisits: 12, retentionRate: '95%', color: '#48BB78' },
    { name: 'Fluctuating', count: 300, avgVisits: 8, retentionRate: '75%', color: '#ECC94B' },
    { name: 'Declining', count: 100, avgVisits: 3, retentionRate: '40%', color: '#F56565' },
  ];

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl" mt={8}>
      <Heading size="md" mb={4}>Member Segment Breakdown</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr bg={headerBgColor}>
              <Th>Segment</Th>
              <Th isNumeric>Count</Th>
              <Th isNumeric>Avg. Visits/Month</Th>
              <Th isNumeric>Retention Rate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {segments.map((segment) => (
              <Tr key={segment.name}>
                <Td fontWeight="bold" color={segment.color}>{segment.name}</Td>
                <Td isNumeric>{segment.count}</Td>
                <Td isNumeric>{segment.avgVisits}</Td>
                <Td isNumeric>{segment.retentionRate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default MemberSegmentBreakdown;