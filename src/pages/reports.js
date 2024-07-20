import React from 'react';
import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import ReportBuilder from '../components/reports/ReportBuilder';
import AnalyticsDashboard from '../components/reports/AnalyticsDashboard';

const Reports = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <Heading mb={2}>Reports & Analytics</Heading>
      <Text mb={6} color={useColorModeValue('gray.600', 'gray.400')}>Generate custom reports and gain deeper insights into your gym's performance.</Text>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <ReportBuilder />
        <AnalyticsDashboard />
      </SimpleGrid>
    </Box>
  );
};

export default Reports;