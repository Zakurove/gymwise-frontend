import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Box, Button, Input, FormControl, FormLabel, VStack, Text, Heading, 
  useColorModeValue, useToast, Checkbox, Flex, Link
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import NextLink from 'next/link';
import { motion } from "framer-motion";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const bgColor = useColorModeValue("white", "gray.800");
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password, rememberMe);
      router.push("/dashboard");
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.detail || "Please try again.",
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
          <Heading as="h2" size="xl">Login</Heading>
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
              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters long" }
                  })} 
                />
                {errors.password && <Text color="red.500">{errors.password.message}</Text>}
              </FormControl>
              <Flex width="100%" justify="space-between" align="center">
                <Checkbox 
                  isChecked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
                <NextLink href="/forgot-password" passHref>
                  <Link color="blue.500">Forgot password?</Link>
                </NextLink>
              </Flex>
              <Button type="submit" colorScheme="blue" width="full">
                Login
              </Button>
            </VStack>
          </form>
          <Text>
            Don't have an account?{" "}
            <NextLink href="/register" passHref>
              <Link color="blue.500">Register here</Link>
            </NextLink>
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default LoginForm;