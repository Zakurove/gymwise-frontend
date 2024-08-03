import React from 'react';
import { Box, Heading, Text, VStack, Button, Icon, useColorModeValue, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaCheckCircle, FaEnvelope, FaUserCog, FaHome } from 'react-icons/fa';

const RegistrationSuccess = () => {
  const router = useRouter();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} minHeight="100vh" py={10}>
      <Box maxW="container.md" mx="auto" bg={cardBg} p={8} borderRadius="lg" boxShadow="xl">
        <VStack spacing={8} align="stretch">
          <VStack>
            <Icon as={FaCheckCircle} w={16} h={16} color="green.500" />
            <Heading as="h1" size="xl" textAlign="center" color="green.500">
              Registration Successful!
            </Heading>
          </VStack>
          
          <Text fontSize="xl" textAlign="center" fontWeight="bold">
            Welcome to GymWise! Your journey towards better gym management starts here.
          </Text>
          
          <VStack spacing={6} align="stretch" bg={useColorModeValue('gray.100', 'gray.600')} p={6} borderRadius="md">
            <HStack>
              <Icon as={FaEnvelope} w={6} h={6} color="blue.500" />
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="semibold">Step 1: Confirm Your Email</Text>
                <Text fontSize="md">
                  Please check your inbox for a confirmation email. Click the link inside to verify your email address.
                </Text>
              </VStack>
            </HStack>
            
            <HStack>
              <Icon as={FaUserCog} w={6} h={6} color="purple.500" />
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="semibold">Step 2: Admin Review</Text>
                <Text fontSize="md">
                  Once your email is confirmed, our admin team will review your account. This helps us maintain a secure environment for all our users.
                </Text>
              </VStack>
            </HStack>
            
            <HStack>
              <Icon as={FaEnvelope} w={6} h={6} color="green.500" />
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="semibold">Step 3: Account Activation</Text>
                <Text fontSize="md">
                  You'll receive another email once your account is activated. Then you'll be all set to start using GymWise!
                </Text>
              </VStack>
            </HStack>
          </VStack>
          
          <Text fontSize="lg" textAlign="center" fontStyle="italic">
            Thank you for choosing GymWise. We're excited to help you revolutionize your gym management!
          </Text>
          
          <Button 
            leftIcon={<FaHome />}
            colorScheme="blue" 
            size="lg"
            onClick={() => router.push('/')} 
            alignSelf="center"
          >
            Return to Home
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default RegistrationSuccess;