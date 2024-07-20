import React from 'react';
import { Box, Heading, VStack, FormControl, FormLabel, Select, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiFileText, FiCalendar, FiDownload } from 'react-icons/fi';

const ReportBuilder = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="md" mb={6}>Custom Report Builder</Heading>
      <VStack spacing={6} as="form">
        <FormControl>
          <FormLabel>Report Type</FormLabel>
          <Select placeholder="Select report type" icon={<Icon as={FiFileText} />}>
            <option value="membership">Membership Report</option>
            <option value="revenue">Revenue Report</option>
            <option value="engagement">Engagement Report</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Time Period</FormLabel>
          <Select placeholder="Select time period" icon={<Icon as={FiCalendar} />}>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="lastYear">Last Year</option>
          </Select>
        </FormControl>
        <Button leftIcon={<FiDownload />} colorScheme="blue" width="full">Generate Report</Button>
      </VStack>
    </Box>
  );
};

export default ReportBuilder;