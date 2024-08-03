import React from 'react';
import { Box, Heading, VStack, useColorModeValue } from '@chakra-ui/react';
import MemberListView from '../../components/members/MemberListView';
import { useSelector } from 'react-redux';

const MembersPage = () => {
  const { user } = useSelector(state => state.auth);
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl" color="brand.500">Member Management</Heading>
        <MemberListView />
      </VStack>
    </Box>
  );
};

export default MembersPage;