// src/components/reports/ReportBuilder.js

import React from 'react';
import { Box, Heading, VStack, FormControl, FormLabel, Select, Button, Icon, useColorModeValue, SimpleGrid, Checkbox, Text, Flex, Tooltip } from '@chakra-ui/react';
import { FiFileText, FiCalendar, FiDownload, FiPieChart, FiBarChart2, FiTrendingUp, FiInfo } from 'react-icons/fi';

const ReportBuilder = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box bg={bgColor} p={8} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Custom Report Builder</Heading>
        <Tooltip label="Build your custom report by selecting options below">
          <Icon as={FiInfo} color="brand.500" boxSize={6} cursor="pointer" />
        </Tooltip>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <VStack spacing={6} align="stretch">
          <FormControl>
            <FormLabel fontWeight="bold">Report Type</FormLabel>
            <Select placeholder="Select report type" icon={<Icon as={FiFileText} />} size="lg">
              <option value="membership">Membership Report</option>
              <option value="revenue">Revenue Report</option>
              <option value="engagement">Engagement Report</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="bold">Time Period</FormLabel>
            <Select placeholder="Select time period" icon={<Icon as={FiCalendar} />} size="lg">
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="lastYear">Last Year</option>
            </Select>
          </FormControl>
        </VStack>
        <VStack spacing={6} align="stretch">
          <FormControl>
            <FormLabel fontWeight="bold">Include Visualizations</FormLabel>
            <VStack align="start" spacing={3}>
              <Checkbox size="lg" colorScheme="brand"><Icon as={FiPieChart} mr={2} />Pie Charts</Checkbox>
              <Checkbox size="lg" colorScheme="brand"><Icon as={FiBarChart2} mr={2} />Bar Graphs</Checkbox>
              <Checkbox size="lg" colorScheme="brand"><Icon as={FiTrendingUp} mr={2} />Trend Lines</Checkbox>
            </VStack>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="bold">Data Granularity</FormLabel>
            <Select placeholder="Select granularity" size="lg">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
          </FormControl>
        </VStack>
      </SimpleGrid>
      <Button leftIcon={<FiDownload />} colorScheme="brand" size="lg" width="full" mt={8} height="60px" fontSize="xl">
        Generate Report
      </Button>
    </Box>
  );
};

export default ReportBuilder;