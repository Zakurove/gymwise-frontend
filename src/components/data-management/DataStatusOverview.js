import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, VStack, HStack, Text, Icon, useColorModeValue, Progress, Spinner } from '@chakra-ui/react';
import { FiDatabase, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { fetchDataStatus } from '../../redux/members/membersActions';

const DataStatusOverview = () => {
  const dispatch = useDispatch();
  const { dataStatus, loading, error } = useSelector(state => state.members);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    dispatch(fetchDataStatus());
  }, [dispatch]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  const {
    lastUpdate = null,
    totalRecords = 0,
    processedRecords = 0,
    dataQuality = 0
  } = dataStatus || {};

  return (
    <Box bg={bgColor} p={8} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="lg" mb={6}>Data Status Overview</Heading>
      <VStack spacing={6} align="stretch">
        <HStack spacing={4}>
          <Icon as={FiClock} color="brand.500" boxSize={6} />
          <Text fontWeight="bold">Last Update:</Text>
          <Text>{lastUpdate ? new Date(lastUpdate).toLocaleString() : 'N/A'}</Text>
        </HStack>
        <HStack spacing={4}>
          <Icon as={FiDatabase} color="brand.500" boxSize={6} />
          <Text fontWeight="bold">Total Records:</Text>
          <Text>{totalRecords.toLocaleString()}</Text>
        </HStack>
        <Box>
          <HStack spacing={4} mb={2}>
            <Icon as={FiCheckCircle} color="green.500" boxSize={6} />
            <Text fontWeight="bold">Processed Records:</Text>
            <Text>{processedRecords.toLocaleString()} / {totalRecords.toLocaleString()}</Text>
          </HStack>
          <Progress value={(processedRecords / totalRecords) * 100 || 0} size="sm" colorScheme="green" />
        </Box>
        <Box>
          {/* <HStack spacing={4} mb={2}>
            <Icon as={FiAlertCircle} color={dataQuality >= 95 ? "green.500" : "orange.500"} boxSize={6} />
            <Text fontWeight="bold">Data Quality Score:</Text>
            <Text>{dataQuality}%</Text>
          </HStack> */}
          <Progress value={dataQuality} size="sm" colorScheme={dataQuality >= 95 ? "green" : "orange"} />
        </Box>
      </VStack>
    </Box>
  );
};

export default DataStatusOverview;