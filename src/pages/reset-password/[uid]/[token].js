import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react';
import axios from 'axios';
import NextLink from 'next/link';
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

const DynamicPasswordRequirements = dynamic(
  () => import("../../../components/accounts/PasswordRequirements"),
  { ssr: false }
);

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { uid, token } = router.query;
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/api/reset-password/${uid}/${token}/`, {
        password,
        confirm_password: confirmPassword,
      });
      toast({
        title: 'Password reset successful',
        description: 'You can now log in with your new password.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/login');
    } catch (error) {
      toast({
        title: 'Password reset failed',
        description: error.response?.data?.error || 'An error occurred. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box bg={bgColor} p={8} rounded="lg" shadow="md" maxW="md" mx="auto">
        <VStack spacing={4} align="stretch">
          <Heading>Reset Password</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <DynamicPasswordRequirements password={password} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
              <Button 
                type="submit" 
                colorScheme="blue" 
                isLoading={isLoading}
                isDisabled={!password || password !== confirmPassword}
              >
                Reset Password
              </Button>
            </VStack>
          </form>
          <Text mt={4}>
            Remember your password?{" "}
            <NextLink href="/login" passHref legacyBehavior>
            <ChakraLink color="blue.500">Login here</ChakraLink>
          </NextLink>
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default ResetPassword;