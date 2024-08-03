import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, VStack, HStack, Text, Icon, useColorModeValue, Progress } from '@chakra-ui/react';
import { FiDatabase, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const DataStatusOverview = () => {
  const { user } = useSelector(state => state.auth);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data - in a real application, this would come from your Redux store
  const dataStatus = {
    lastUpdate: '2023-05-15 14:30',
    totalRecords: 15000,
    processedRecords: 14850,
    dataQuality: 98.5,
  };

  return (
    <Box bg={bgColor} p={8} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="lg" mb={6}>Data Status Overview for {user?.institution?.name}</Heading>
      <VStack spacing={6} align="stretch">
        <HStack spacing={4}>
          <Icon as={FiClock} color="brand.500" boxSize={6} />
          <Text fontWeight="bold">Last Update:</Text>
          <Text>{dataStatus.lastUpdate}</Text>
        </HStack>
        <HStack spacing={4}>
          <Icon as={FiDatabase} color="brand.500" boxSize={6} />
          <Text fontWeight="bold">Total Records:</Text>
          <Text>{dataStatus.totalRecords.toLocaleString()}</Text>
        </HStack>
        <Box>
          <HStack spacing={4} mb={2}>
            <Icon as={FiCheckCircle} color="green.500" boxSize={6} />
            <Text fontWeight="bold">Processed Records:</Text>
            <Text>{dataStatus.processedRecords.toLocaleString()} / {dataStatus.totalRecords.toLocaleString()}</Text>
          </HStack>
          <Progress value={(dataStatus.processedRecords / dataStatus.totalRecords) * 100} size="sm" colorScheme="green" />
        </Box>
        <Box>
          <HStack spacing={4} mb={2}>
            <Icon as={FiAlertCircle} color={dataStatus.dataQuality >= 95 ? "green.500" : "orange.500"} boxSize={6} />
            <Text fontWeight="bold">Data Quality Score:</Text>
            <Text>{dataStatus.dataQuality}%</Text>
          </HStack>
          <Progress value={dataStatus.dataQuality} size="sm" colorScheme={dataStatus.dataQuality >= 95 ? "green" : "orange"} />
        </Box>
      </VStack>
    </Box>
  );
};

export default DataStatusOverview;