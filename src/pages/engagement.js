import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, Text, Flex, Button, useColorModeValue, VStack, Icon, useDisclosure, Spinner } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import CampaignCreator from '../components/engagement/CampaignCreator';
import ActiveCampaigns from '../components/engagement/ActiveCampaigns';
import CampaignInsights from '../components/engagement/CampaignInsights';
import { fetchCampaignSuggestions, fetchCampaignPerformance } from '../redux/campaigns/campaignsActions';

const Engagement = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { campaignSuggestions, campaignPerformance, loading, error } = useSelector(state => state.campaigns);
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(fetchCampaignSuggestions());
    dispatch(fetchCampaignPerformance());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="lg" color="red.500">Error: {error}</Heading>
      </Box>
    );
  }

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Heading size="xl" mb={2} color="brand.500">Engagement Orchestrator</Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              Create and manage personalized engagement campaigns for {user.institution_name} members.
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
        <ActiveCampaigns campaigns={campaignPerformance} />
      </VStack>

      <CampaignCreator 
        isOpen={isOpen} 
        onClose={onClose} 
        suggestions={campaignSuggestions}
        onCampaignCreated={() => {
          dispatch(fetchCampaignSuggestions());
          dispatch(fetchCampaignPerformance());
        }}
      />
    </Box>
  );
};

export default Engagement;