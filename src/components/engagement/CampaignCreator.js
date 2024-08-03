import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, VStack, FormControl, FormLabel, Input, Select, Textarea, Switch, 
  Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, useColorModeValue, useToast,
  Alert, AlertIcon, AlertTitle, AlertDescription,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';

const CampaignCreator = ({ isOpen, onClose, suggestions, onCampaignCreated }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Select Template', 'Customize', 'Review'];
  const toast = useToast();

  const [campaignData, setCampaignData] = useState({
    name: '',
    target_segment: '',
    campaign_type: '',
    message: '',
    start_date: '',
    end_date: '',
    ai_optimization: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTemplateSelection = (suggestion) => {
    setCampaignData({
      ...campaignData,
      target_segment: suggestion.target_segment,
      campaign_type: suggestion.campaign_type,
      message: suggestion.message_template,
    });
    setCurrentStep(1);
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    try {
      await axios.post('/ai/create-campaign/', campaignData);
      toast({
        title: "Campaign created",
        description: "Your campaign has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onCampaignCreated();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Campaign</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs index={currentStep} onChange={setCurrentStep}>
            <TabList>
              {steps.map((step, index) => (
                <Tab key={index}>{step}</Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Text fontWeight="bold">AI-Suggested Campaigns</Text>
                  {suggestions.map((suggestion, index) => (
                    <Alert
                      key={index}
                      status="info"
                      variant="subtle"
                      flexDirection="column"
                      alignItems="start"
                      justifyContent="space-between"
                      textAlign="left"
                      p={4}
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() => handleTemplateSelection(suggestion)}
                      _hover={{ bg: useColorModeValue('blue.50', 'blue.900') }}
                    >
                      <AlertTitle mb={1}>{suggestion.campaign_type} for {suggestion.target_segment}</AlertTitle>
                      <AlertDescription>
                        <Text mb={2}>Target: {suggestion.member_count} members</Text>
                        <Text>{suggestion.message_template}</Text>
                      </AlertDescription>
                      <Button mt={2} size="sm" colorScheme="blue">Use This Template</Button>
                    </Alert>
                  ))}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Campaign Name</FormLabel>
                    <Input name="name" value={campaignData.name} onChange={handleInputChange} placeholder="Enter campaign name" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Target Segment</FormLabel>
<Input name="target_segment" value={campaignData.target_segment} onChange={handleInputChange} placeholder="Enter target segment" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Campaign Type</FormLabel>
                    <Input name="campaign_type" value={campaignData.campaign_type} onChange={handleInputChange} placeholder="Enter campaign type" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea name="message" value={campaignData.message} onChange={handleInputChange} placeholder="Enter campaign message" rows={5} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Start Date</FormLabel>
                    <Input name="start_date" type="date" value={campaignData.start_date} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>End Date</FormLabel>
                    <Input name="end_date" type="date" value={campaignData.end_date} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="ai-optimization" mb="0">
                      Enable AI Optimization
                    </FormLabel>
                    <Switch name="ai_optimization" isChecked={campaignData.ai_optimization} onChange={handleInputChange} id="ai-optimization" colorScheme="brand" />
                  </FormControl>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4} align="start">
                  <Text><strong>Campaign Name:</strong> {campaignData.name}</Text>
                  <Text><strong>Target Segment:</strong> {campaignData.target_segment}</Text>
                  <Text><strong>Campaign Type:</strong> {campaignData.campaign_type}</Text>
                  <Text><strong>Message:</strong> {campaignData.message}</Text>
                  <Text><strong>Start Date:</strong> {campaignData.start_date}</Text>
                  <Text><strong>End Date:</strong> {campaignData.end_date}</Text>
                  <Text><strong>AI Optimization:</strong> {campaignData.ai_optimization ? 'Enabled' : 'Disabled'}</Text>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          {currentStep > 0 && (
            <Button mr={3} onClick={handlePrev}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button colorScheme="brand" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button colorScheme="brand" onClick={handleSubmit}>
              Create Campaign
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CampaignCreator;