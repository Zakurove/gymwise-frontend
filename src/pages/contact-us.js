import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  HStack,
  Icon,
  Flex,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeadset, FaGlobe } from "react-icons/fa";
import axios from "axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const accentColor = useColorModeValue("brand.500", "brand.300");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8000/api/contact/", formData);
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "An error occurred. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContactInfo = ({ icon, children }) => (
    <HStack spacing={4}>
      <Flex align="center" justify="center" w={10} h={10} rounded="full" bg={useColorModeValue("brand.100", "brand.900")}>
        <Icon as={icon} w={5} h={5} color={accentColor} />
      </Flex>
      <Text fontSize="lg">{children}</Text>
    </HStack>
  );

  const SupportInfo = ({ icon, title, children }) => (
    <HStack spacing={4} align="flex-start">
      <Flex align="center" justify="center" w={10} h={10} rounded="full" bg={useColorModeValue("brand.100", "brand.900")}>
        <Icon as={icon} w={5} h={5} color={accentColor} />
      </Flex>
      <VStack align="start" spacing={1}>
        <Text fontWeight="bold">{title}</Text>
        <Text>{children}</Text>
      </VStack>
    </HStack>
  );

  return (
    <Box bg={bgColor}>
      <Container maxW="container.xl" py={20}>
        <VStack spacing={16} align="stretch">
          <VStack spacing={5} textAlign="center">
            <Heading as="h1" size="3xl" fontWeight="bold">
              Get in{" "}
              <Text as="span" color={accentColor}>
                Touch
              </Text>
            </Heading>
            <Text fontSize="xl" maxW="2xl" mx="auto" color={useColorModeValue("gray.600", "gray.300")}>
              We're here to help. Reach out to us with any questions or concerns about how GymWise can transform your business.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
            <VStack spacing={8} align="stretch">
              <Box bg={cardBg} p={10} rounded="xl" shadow="xl">
                <form onSubmit={handleSubmit}>
                  <VStack align="start" spacing={8}>
                    <Heading as="h2" size="xl">
                      Send Us a Message
                    </Heading>
                    <FormControl isRequired>
                      <FormLabel>Your Name</FormLabel>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        size="lg"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Your Email</FormLabel>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        type="email"
                        size="lg"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Your Message</FormLabel>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help you?"
                        size="lg"
                        minH="200px"
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      colorScheme="brand"
                      size="lg"
                      width="full"
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                      transition="all 0.2s"
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
              </Box>
            </VStack>

            <VStack spacing={8} align="stretch">
              <Box bg={cardBg} p={10} rounded="xl" shadow="xl">
                <VStack align="start" spacing={8}>
                  <Heading as="h2" size="xl">
                    Contact Information
                  </Heading>
                  <VStack align="start" spacing={6} width="full">
                    <ContactInfo icon={FaPhone}>+966 502556166</ContactInfo>
                    <ContactInfo icon={FaEnvelope}>contact@gymwise.tech</ContactInfo>
                    <ContactInfo icon={FaMapMarkerAlt}>Riyadh, Saudi Arabia</ContactInfo>
                  </VStack>
                </VStack>
              </Box>
              <Box bg={cardBg} p={10} rounded="xl" shadow="xl">
                <VStack align="start" spacing={6}>
                  <Heading as="h2" size="xl">
                    Customer Support
                  </Heading>
                  <SupportInfo icon={FaHeadset} title="24/7 Availability">
                    Our support team is available round the clock to assist you.
                  </SupportInfo>
                  <SupportInfo icon={FaGlobe} title="Global Coverage">
                    We provide support across all time zones.
                  </SupportInfo>
                </VStack>
              </Box>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}