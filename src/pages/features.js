// pages/features.js
import { Box, Container, Heading, Text, SimpleGrid, Icon, VStack } from "@chakra-ui/react";
import { FaRegThumbsUp, FaRegSmile, FaDollarSign } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";

const features = [
  {
    title: "Churn Prediction",
    icon: FaRegThumbsUp,
    description: "Predict member churn and take proactive measures to retain them using our advanced AI algorithms. Our predictive models analyze member behavior and identify those at risk of leaving, allowing you to take action before it's too late."
  },
  {
    title: "Personalized Communication",
    icon: FaRegSmile,
    description: "Engage your members with personalized messages and offers tailored to their preferences and behaviors. Our platform helps you send targeted communications that resonate with each member, improving engagement and satisfaction."
  },
  {
    title: "Performance Analytics",
    icon: FaDollarSign,
    description: "Gain insights into your gym's performance with detailed analytics and reporting tools. Track key metrics, identify trends, and make data-driven decisions to optimize your operations and drive growth."
  }
];

export default function Features() {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl" centerContent>
        <Box py={10} px={6}>
          <Heading textAlign="center" fontSize="3xl" mb={6} color="#002060">
            Features
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {features.map((feature) => (
              <VStack key={feature.title} spacing={3}>
                <Icon as={feature.icon} w={10} h={10} color="#249EA1" />
                <Heading fontSize="xl">{feature.title}</Heading>
                <Text textAlign="center" color="gray.600">{feature.description}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
}

