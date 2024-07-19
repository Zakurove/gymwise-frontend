import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Box, Button, Input, FormControl, FormLabel, VStack, Text, Heading, 
  useColorModeValue, useToast, Link
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from 'next/link';
import { motion } from "framer-motion";

const ForgotPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8000/api/forgot-password/", data);
      toast({
        title: "Reset link sent",
        description: "Please check your email for the password reset link.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "An error occurred. Please try again.",
        status: "error",
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
        <VStack spacing={6}>
          <Heading as="h2" size="xl">Forgot Password</Heading>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })} 
                />
                {errors.email && <Text color="red.500">{errors.email.message}</Text>}
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full" isLoading={isLoading}>
                Send Reset Link
              </Button>
            </VStack>
          </form>
          <Text>
            Remember your password?{" "}
            <NextLink href="/login" passHref>
              <Link color="blue.500">Login here</Link>
            </NextLink>
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default ForgotPasswordForm;