// src/components/data-management/DataUploadForm.js

import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  VStack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Icon,
  Center,
} from '@chakra-ui/react';
import { FiUploadCloud } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';

const DataUploadForm = ({ onFileUpload }) => {
  const { loading, error } = useSelector(state => state.members);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: '.csv',
    multiple: false,
  });

  return (
    <Box bg={bgColor} p={6} borderRadius="md" borderWidth={1} borderColor={borderColor} boxShadow="md">
      <VStack spacing={6} align="stretch">
        <FormControl>
          <FormLabel>Select CSV File</FormLabel>
          <Center 
            {...getRootProps()}
            h="200px" 
            border="2px dashed" 
            borderColor={isDragActive ? "brand.500" : "gray.300"}
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
          >
            <input {...getInputProps()} />
            <VStack spacing={2}>
              <Icon as={FiUploadCloud} w={10} h={10} color={isDragActive ? "brand.500" : "gray.500"} />
              <Text fontWeight="medium" textAlign="center">
                {acceptedFiles.length > 0
                  ? `Selected file: ${acceptedFiles[0].name}`
                  : isDragActive
                    ? "Drop the CSV file here"
                    : "Drag and drop your CSV file here, or click to select"
                }
              </Text>
              <Text fontSize="sm" color="gray.500">
                (Only .csv files are accepted)
              </Text>
            </VStack>
          </Center>
        </FormControl>
        
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text>{error}</Text>
          </Alert>
        )}
        
        {loading && (
          <Alert status="info">
            <AlertIcon />
            <Text>Analyzing your file, please wait...</Text>
          </Alert>
        )}
      </VStack>
    </Box>
  );
};

export default DataUploadForm;