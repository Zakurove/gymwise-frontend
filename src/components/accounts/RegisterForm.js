import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  Input, 
  FormControl, 
  FormLabel, 
  VStack, 
  Text, 
  Heading, 
  useColorModeValue, 
  Link as ChakraLink
} from "@chakra-ui/react";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import PasswordRequirements from "./PasswordRequirements";
import { registerUser } from "../../redux/auth/authActions";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const router = useRouter();
  const bgColor = useColorModeValue("white", "gray.800");

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data));
      router.push('/registration-success');
    } catch (error) {
      // Error handling is done in the reducer
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
          <Heading as="h2" size="xl">Register</Heading>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.first_name}>
                <FormLabel>First Name</FormLabel>
                <Input {...register("first_name", { required: "First Name is required" })} />
                {errors.first_name && <Text color="red.500">{errors.first_name.message}</Text>}
              </FormControl>
              <FormControl isInvalid={errors.last_name}>
                <FormLabel>Last Name</FormLabel>
                <Input {...register("last_name", { required: "Last Name is required" })} />
                {errors.last_name && <Text color="red.500">{errors.last_name.message}</Text>}
              </FormControl>
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
                    validate: (value) => {
                      const requirements = [
                        { re: /.{8,}/, message: "Be at least 8 characters long" },
                        { re: /[A-Z]/, message: "Contain at least one uppercase letter" },
                        { re: /[a-z]/, message: "Contain at least one lowercase letter" },
                        { re: /[0-9]/, message: "Contain at least one number" },
                        { re: /[^A-Za-z0-9]/, message: "Contain at least one special character" },
                      ];
                      const failedRequirements = requirements.filter(req => !req.re.test(value));
                      return failedRequirements.length === 0 || "Password does not meet all requirements";
                    }
                  })} 
                />
                {errors.password && <Text color="red.500">{errors.password.message}</Text>}
                <PasswordRequirements password={password} />
              </FormControl>
              <Button 
                type="submit" 
                colorScheme="blue" 
                width="full" 
                isLoading={loading}
                isDisabled={Object.keys(errors).length > 0}
              >
                Register
              </Button>
            </VStack>
          </form>
          {error && <Text color="red.500">{error}</Text>}
          <Text>
            Already have an account?{" "}
            <NextLink href="/login" passHref legacyBehavior>
              <ChakraLink color="blue.500">Login here</ChakraLink>
            </NextLink>
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default RegisterForm;