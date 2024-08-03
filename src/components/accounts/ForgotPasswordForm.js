import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Button, Input, FormControl, FormLabel, VStack, Text, Heading, 
  useColorModeValue, useToast, Link as ChakraLink
} from "@chakra-ui/react";
import NextLink from 'next/link';
import { motion } from "framer-motion";
import { forgotPassword } from "../../redux/auth/authActions";

const ForgotPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");

  const onSubmit = async (data) => {
    try {
      await dispatch(forgotPassword(data.email));
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
        description: error.message || "An error occurred. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
              <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
                Send Reset Link
              </Button>
            </VStack>
          </form>
          {error && <Text color="red.500">{error}</Text>}
          <Text>
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

export default ForgotPasswordForm;