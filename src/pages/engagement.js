import React from 'react';
import { Box, Heading, Text, Flex, Button, useColorModeValue, VStack, Icon, useDisclosure } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import CampaignCreator from '../components/engagement/CampaignCreator';
import ActiveCampaigns from '../components/engagement/ActiveCampaigns';
import CampaignInsights from '../components/engagement/CampaignInsights';

const Engagement = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Heading size="xl" mb={2} color="brand.500">Engagement Orchestrator</Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              Create and manage personalized engagement campaigns for your members.
            </Text>
          </Box>
          <Button
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="brand"
            size="md"
            onClick={onOpen}
          >
            Create Campaign
          </Button>
        </Flex>

        <CampaignInsights />
        <ActiveCampaigns />
      </VStack>

      <CampaignCreator isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Engagement;