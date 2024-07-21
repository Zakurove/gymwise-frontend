import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, VStack, FormControl, FormLabel, Input, Select, Textarea, Switch, 
  Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, useColorModeValue
} from '@chakra-ui/react';
import { FiSend, FiUsers, FiBell, FiCalendar } from 'react-icons/fi';

const CampaignCreator = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Basic Info', 'Message', 'Schedule', 'Review'];

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

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
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Campaign Name</FormLabel>
                    <Input placeholder="Enter campaign name" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Target Segment</FormLabel>
                    <Select placeholder="Select target segment">
                      <option value="thriving">Thriving</option>
                      <option value="fluctuating">Fluctuating</option>
                      <option value="declining">Declining</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Campaign Type</FormLabel>
                    <Select placeholder="Select campaign type">
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="push">Push Notification</option>
                    </Select>
                  </FormControl>
                </VStack>
              </TabPanel>
              <TabPanel>
                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea placeholder="Enter campaign message" rows={10} />
                </FormControl>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Start Date</FormLabel>
                    <Input type="date" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>End Date</FormLabel>
                    <Input type="date" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="ai-optimization" mb="0">
                      Enable AI Optimization
                    </FormLabel>
                    <Switch id="ai-optimization" colorScheme="brand" />
                  </FormControl>
                </VStack>
              </TabPanel>
              <TabPanel>
                <Text>Review your campaign details here...</Text>
                {/* Add a summary of all inputted details */}
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
            <Button colorScheme="brand" onClick={onClose}>
              Create Campaign
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CampaignCreator;