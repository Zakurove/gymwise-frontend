import { Box, Container, Heading, Text, VStack, SimpleGrid, Input, Button, useColorModeValue, FormControl, FormLabel, Select, Textarea, Icon, HStack } from "@chakra-ui/react";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

export default function BookDemo() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const accentColor = useColorModeValue("brand.500", "brand.300");

  return (
    <Box bg={bgColor}>
      <Container maxW="container.xl" py={20}>
        <VStack spacing={16} align="stretch">
          <VStack spacing={5} textAlign="center">
            <Heading as="h1" size="3xl" fontWeight="bold">
              Book a{" "}
              <Text as="span" color={accentColor}>
                Free Demo
              </Text>
            </Heading>
            <Text fontSize="xl" maxW="2xl" mx="auto" color={useColorModeValue("gray.600", "gray.300")}>
              Experience firsthand how GymWise can revolutionize your gym's member retention and engagement. Schedule a personalized demo today.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
            <Box bg={cardBg} p={10} rounded="xl" shadow="xl">
              <VStack align="start" spacing={8}>
                <Heading as="h2" size="xl">
                  Schedule Your Demo
                </Heading>
                <FormControl>
                  <FormLabel>Your Name</FormLabel>
                  <Input placeholder="John Doe" size="lg" />
                </FormControl>
                <FormControl>
                  <FormLabel>Your Email</FormLabel>
                  <Input placeholder="john@example.com" type="email" size="lg" />
                </FormControl>
                <FormControl>
                  <FormLabel>Your Phone</FormLabel>
                  <Input placeholder="+1 (xxx) xxx-xxxx" size="lg" />
                </FormControl>
                <FormControl>
                  <FormLabel>Gym Name</FormLabel>
                  <Input placeholder="FitnessPro Gym" size="lg" />
                </FormControl>
                <FormControl>
                  <FormLabel>Gym Size</FormLabel>
                  <Select placeholder="Select gym size" size="lg">
                    <option value="small">Small (less than 500 members)</option>
                    <option value="medium">Medium (500-2000 members)</option>
                    <option value="large">Large (more than 2000 members)</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Preferred Demo Date</FormLabel>
                  <Input type="date" size="lg" />
                </FormControl>
                <FormControl>
                  <FormLabel>Additional Comments</FormLabel>
                  <Textarea placeholder="Any specific questions or areas you'd like us to focus on during the demo?" size="lg" />
                </FormControl>
                <Button 
                  colorScheme="brand" 
                  size="lg" 
                  width="full"
                  leftIcon={<FaCalendarAlt />}
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  transition="all 0.2s"
                >
                  Book Your Demo
                </Button>
              </VStack>
            </Box>

            <VStack spacing={8} align="stretch">
              <Box bg={cardBg} p={10} rounded="xl" shadow="xl">
                <VStack align="start" spacing={6}>
                  <Heading as="h2" size="xl">
                    What to Expect
                  </Heading>
                  <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                    During your personalized demo, our expert team will:
                  </Text>
                  <VStack align="start" spacing={4}>
                    {[
                      "Showcase GymWise's key features",
                      "Demonstrate how our AI predicts member churn",
                      "Explain our personalized engagement strategies",
                      "Present our comprehensive analytics dashboard",
                      "Answer any questions you may have"
                    ].map((item, index) => (
                      <HStack key={index} spacing={4}>
                        <Icon as={FaCheckCircle} color={accentColor} w={5} h={5} />
                        <Text fontSize="lg">{item}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>
              <Box bg={cardBg} p={10} rounded="xl" shadow="xl">
                <VStack align="start" spacing={6}>
                  <Heading as="h2" size="xl">
                    Why Choose GymWise?
                  </Heading>
                  <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                    GymWise is the leading solution for gyms looking to:
                  </Text>
                  <VStack align="start" spacing={4}>
                    {[
                      "Increase member retention",
                      "Boost revenue through targeted engagement",
                      "Save time with automated processes",
                      "Make data-driven decisions",
                      "Improve overall member satisfaction"
                    ].map((item, index) => (
                      <HStack key={index} spacing={4}>
                        <Icon as={FaCheckCircle} color={accentColor} w={5} h={5} />
                        <Text fontSize="lg">{item}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}