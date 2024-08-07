import React from 'react';
import { Box, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import DataUploadWizard from '../components/data-management/DataUploadWizard';
import DataStatusOverview from '../components/data-management/DataStatusOverview';
import { useAuthCheck } from '../hooks/useAuthCheck';

const DataManagement = () => {
  const { user } = useAuthCheck();
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={2} color="brand.500">Data Management</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Upload and manage {user?.institution?.name}'s member data to power AI insights.
          </Text>
        </Box>

        <DataUploadWizard />
        <DataStatusOverview />
      </VStack>
    </Box>
  );
};

export default DataManagement;