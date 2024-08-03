import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import DataUploadForm from '../components/data-management/DataUploadForm';
import DataStatusOverview from '../components/data-management/DataStatusOverview';

const DataManagement = () => {
  const { user } = useSelector(state => state.auth);
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={2} color="brand.500">Data Management</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Upload and manage {user.institution_name}'s member data to power AI insights.
          </Text>
        </Box>

        <DataUploadForm />
        <DataStatusOverview />
      </VStack>
    </Box>
  );
};

export default DataManagement;