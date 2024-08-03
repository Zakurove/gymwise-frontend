import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
  useToast,
  Heading
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';

const DataUploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState([]);
  const { user } = useSelector(state => state.auth);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.700');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrors(['Please select a file to upload']);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      toast({
        title: 'Upload Successful',
        description: 'Your data has been uploaded and is being processed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload failed:', error);
      setErrors(['Upload failed. Please try again.']);
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your data. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Heading size="md">Upload Member Data</Heading>
          <Text>Upload CSV file containing member data for {user?.institution?.name}</Text>
          <FormControl>
            <FormLabel>Select CSV File</FormLabel>
            <Input type="file" accept=".csv" onChange={handleFileChange} />
          </FormControl>
          {errors.length > 0 && (
            <Box color="red.500">
              {errors.map((error, index) => (
                <Text key={index}>{error}</Text>
              ))}
            </Box>
          )}
          {uploading && (
            <Progress value={uploadProgress} size="sm" colorScheme="blue" />
          )}
          <Button
            leftIcon={<FiUpload />}
            colorScheme="blue"
            type="submit"
            isLoading={uploading}
            loadingText="Uploading..."
          >
            Upload Data
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default DataUploadForm;