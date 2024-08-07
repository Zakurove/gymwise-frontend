// src/components/data-management/DataPreviewStep.js

import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  useColorModeValue,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

const DataPreviewStep = () => {
  const { mapping } = useSelector(state => state.members);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const previewData = Object.entries(mapping).map(([csvColumn, mappedColumn]) => ({ csvColumn, mappedColumn }));

  return (
    <Box bg={bgColor} p={6} borderRadius="md" borderWidth={1} borderColor={borderColor} boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Heading size="md">Data Preview</Heading>
        <Text>Review your column mapping before processing the data.</Text>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>CSV Column</Th>
                <Th>Mapped To</Th>
              </Tr>
            </Thead>
            <Tbody>
              {previewData.map((row, index) => (
                <Tr key={index}>
                  <Td>{row.csvColumn}</Td>
                  <Td>{row.mappedColumn}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

export default DataPreviewStep;