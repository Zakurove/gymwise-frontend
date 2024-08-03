// src/components/reports/ReportList.js

import React from 'react';
import { Box, VStack, HStack, Text, Icon, Button, useColorModeValue, Flex, Badge } from '@chakra-ui/react';
import { FiFileText, FiDownload, FiEye, FiTrash2 } from 'react-icons/fi';

const ReportList = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  const reports = [
    { name: 'Monthly Revenue Report', date: '2023-05-01', type: 'Revenue' },
    { name: 'Q2 Membership Overview', date: '2023-04-15', type: 'Membership' },
    { name: 'Annual Engagement Analysis', date: '2023-01-05', type: 'Engagement' },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Revenue': return 'green';
      case 'Membership': return 'blue';
      case 'Engagement': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      {reports.map((report, index) => (
        <Box key={index} p={6} bg={bgColor} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="md" transition="all 0.3s" _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}>
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <Icon as={FiFileText} color="brand.500" boxSize={6} />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" fontSize="lg">{report.name}</Text>
                <HStack>
                  <Text fontSize="sm" color="gray.500">{report.date}</Text>
                  <Badge colorScheme={getTypeColor(report.type)}>{report.type}</Badge>
                </HStack>
              </VStack>
            </HStack>
            <HStack>
              <Button size="sm" leftIcon={<FiEye />} variant="ghost" colorScheme="brand">View</Button>
              <Button size="sm" leftIcon={<FiDownload />} colorScheme="brand">Download</Button>
              <Button size="sm" leftIcon={<FiTrash2 />} variant="ghost" colorScheme="red">Delete</Button>
            </HStack>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default ReportList;