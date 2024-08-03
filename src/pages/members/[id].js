import React from 'react';
import { Box, Heading, VStack, useColorModeValue } from '@chakra-ui/react';
import MemberDetailView from '../../components/members/MemberDetailView';
import { useRouter } from 'next/router';

const MemberDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl" color="brand.500">Member Details</Heading>
        <MemberDetailView memberId={id} />
      </VStack>
    </Box>
  );
};

export default MemberDetailPage;