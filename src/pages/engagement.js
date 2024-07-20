import React from 'react';
import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import CampaignCreator from '../components/engagement/CampaignCreator';
import ActiveCampaigns from '../components/engagement/ActiveCampaigns';

const Engagement = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <Heading mb={2}>Engagement Orchestrator</Heading>
      <Text mb={6} color={useColorModeValue('gray.600', 'gray.400')}>Create and manage personalized engagement campaigns for your members.</Text>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <CampaignCreator />
        <ActiveCampaigns />
      </SimpleGrid>
    </Box>
  );
};

export default Engagement;