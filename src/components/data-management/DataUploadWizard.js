// src/components/data-management/DataUploadWizard.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  useToast,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useColorModeValue,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon, CheckIcon, SettingsIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import DataUploadForm from './DataUploadForm';
import ColumnMappingStep from './ColumnMappingStep';
import DataPreviewStep from './DataPreviewStep';
import ModelTrainingForm from './ModelTrainingForm';
import { analyzeCSV, processMappedData } from '../../redux/members/membersActions';

const DataUploadWizard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const { mapping, loading, error } = useSelector(state => state.members);
  const { user } = useSelector(state => state.auth);
  const toast = useToast();
  const [isModelTrainingOpen, setIsModelTrainingOpen] = useState(false);
  const [isColumnMappingValid, setIsColumnMappingValid] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const steps = [
    { title: 'Upload CSV', description: 'Select and upload your CSV file' },
    { title: 'Map Columns', description: 'Match your columns to our fields' },
    { title: 'Preview & Confirm', description: 'Review and confirm your data' },
  ];

  const handleNext = async () => {
    if (step === 0 && file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await dispatch(analyzeCSV(formData));
        setStep(step + 1);
      } catch (error) {
        toast({
          title: "Error analyzing file",
          description: error.message || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => setStep(step - 1);

  const handleFileUpload = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFinish = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mapping', JSON.stringify(mapping));
    try {
      await dispatch(processMappedData(formData));
      toast({
        title: "Data processed successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push('/members');
    } catch (err) {
      toast({
        title: "Processing failed",
        description: error || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const isAdminOrSuperadmin = user && (user.role === 'admin' || user.role === 'superadmin');

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <DataUploadForm onFileUpload={handleFileUpload} />;
      case 1:
        return <ColumnMappingStep onValidityChange={setIsColumnMappingValid} />;
      case 2:
        return <DataPreviewStep />;
      default:
        return null;
    }
  };

  return (
    <Box bg={bgColor} p={8} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <VStack spacing={8} align="stretch">
        <Flex align="center" justify="space-between">
          <Heading size="lg" color="brand.500">Data Upload Wizard</Heading>
          {isAdminOrSuperadmin && (
            <Tooltip label="Train Institution Model">
              <IconButton
                icon={<SettingsIcon />}
                onClick={() => setIsModelTrainingOpen(true)}
                variant="ghost"
                colorScheme="purple"
                aria-label="Train Institution Model"
              />
            </Tooltip>
          )}
        </Flex>
        
        <Stepper index={step} colorScheme="brand">
          {steps.map((stepInfo, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink='0'>
                <StepTitle>{stepInfo.title}</StepTitle>
                <StepDescription>{stepInfo.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <Box py={4}>
          {renderStepContent()}
        </Box>

        <Flex justifyContent="space-between" mt={6}>
          {step > 0 && (
            <Button leftIcon={<ArrowBackIcon />} onClick={handlePrev} colorScheme="gray">
              Previous
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button 
              rightIcon={<ArrowForwardIcon />} 
              onClick={handleNext} 
              colorScheme="brand" 
              ml="auto"
              isDisabled={(step === 0 && !file) || (step === 1 && !isColumnMappingValid)}
              isLoading={loading}
            >
              {step === 0 ? 'Analyze and Continue' : 'Next'}
            </Button>
          ) : (
            <Button rightIcon={<CheckIcon />} onClick={handleFinish} colorScheme="green" ml="auto" isLoading={loading}>
              Finish
            </Button>
          )}
        </Flex>
      </VStack>

      <Modal isOpen={isModelTrainingOpen} onClose={() => setIsModelTrainingOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Train Institution Model</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModelTrainingForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DataUploadWizard;