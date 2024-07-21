import React from 'react';
import { Box, Heading, Text, Flex, VStack, useColorModeValue, Tabs, TabList, TabPanels, Tab, TabPanel, Icon } from '@chakra-ui/react';
import { FiFileText, FiList } from 'react-icons/fi';
import ReportBuilder from '../components/reports/ReportBuilder';
import ReportList from '../components/reports/ReportList';

const Reports = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Heading size="xl" mb={2} color="brand.500">Reports</Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              Generate custom reports and gain deeper insights into your gym's performance.
            </Text>
          </Box>
        </Flex>

        <Tabs colorScheme="brand" variant="soft-rounded" size="lg">
          <TabList>
            <Tab><Icon as={FiFileText} mr={2} />Report Builder</Tab>
            <Tab><Icon as={FiList} mr={2} />Generated Reports</Tab>
          </TabList>
          <TabPanels mt={6}>
            <TabPanel p={0}>
              <ReportBuilder />
            </TabPanel>
            <TabPanel p={0}>
              <ReportList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default Reports;