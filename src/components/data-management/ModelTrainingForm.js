// src/components/data-management/ModelTrainingForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Progress,
  useColorModeValue,
  Alert,
  AlertIcon,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { FiUploadCloud } from 'react-icons/fi';
import { trainInstitutionModel } from '../../redux/members/membersActions';

const ModelTrainingForm = () => {
  const [file, setFile] = useState(null);
  const { loading, error, modelTrainingStatus } = useSelector(state => state.members);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await dispatch(trainInstitutionModel(formData));
      } catch (error) {
        console.error('Error training model:', error);
      }
    }
  };

  return (
    <Box bg={bgColor} p={6} borderRadius="md" borderWidth={1} borderColor={borderColor} boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Heading size="md">Train Institution Model</Heading>
        <Text>Upload a CSV file to train a custom model for your institution.</Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Select Training Data CSV File</FormLabel>
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                hidden
                id="model-training-file-upload"
              />
              <Button
                as="label"
                htmlFor="model-training-file-upload"
                colorScheme="brand"
                size="lg"
                leftIcon={<Icon as={FiUploadCloud} />}
                cursor="pointer"
                width="full"
              >
                {file ? file.name : 'Choose File'}
              </Button>
            </FormControl>
            
            {file && (
              <Alert status="info">
                <AlertIcon />
                <Text>Selected file: {file.name}</Text>
              </Alert>
            )}
            
            {error && (
              <Alert status="error">
                <AlertIcon />
                <Text>{error}</Text>
              </Alert>
            )}
            
            {modelTrainingStatus === 'success' && (
              <Alert status="success">
                <AlertIcon />
                <Text>Model trained successfully!</Text>
              </Alert>
            )}
            
            {loading && (
              <Box>
                <Text mb={2}>Training Progress</Text>
                <Progress size="sm" isIndeterminate colorScheme="brand" />
              </Box>
            )}
            
            <Button
              type="submit"
              colorScheme="brand"
              isLoading={loading}
              loadingText="Training..."
              disabled={!file}
            >
              Train Model
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default ModelTrainingForm;