import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, VStack, useToast, Heading, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", preferred_date: "" });
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/book-demo/", formData);
      if (response.status === 201) {
        toast({
          title: "Demo booked.",
          description: "We've received your demo booking request.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({ name: "", email: "", phone: "", preferred_date: "" });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to book demo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg={bgColor} p={8} rounded="lg" shadow="md" maxW="md" mx="auto">
      <VStack spacing={6}>
        <Heading as="h2" size="xl">Book a Demo</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Preferred Demo Date</FormLabel>
              <Input name="preferred_date" type="date" value={formData.preferred_date} onChange={handleChange} />
            </FormControl>
            <Button type="submit" colorScheme="brand" width="full">
              Book Demo
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default BookingForm;