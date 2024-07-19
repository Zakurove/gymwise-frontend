import { Box, Container, Heading, Text, Stack, VStack, SimpleGrid, useColorModeValue, Button } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

const articles = [
  { 
    title: "How to Reduce Gym Member Churn", 
    excerpt: "Learn effective strategies to keep your gym members engaged and reduce churn rates...",
    image: "/images/blog/reduce-churn.jpg"
  },
  { 
    title: "The Importance of Personalized Communication", 
    excerpt: "Discover how personalized communication can improve member retention and satisfaction...",
    image: "/images/blog/personalized-communication.jpg"
  },
  { 
    title: "Top Trends in Gym Management", 
    excerpt: "Stay ahead of the curve with the latest trends in gym management and member engagement...",
    image: "/images/blog/gym-trends.jpg"
  }
];

export default function Blog() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bgColor}>
      <Container maxW="container.xl" py={20}>
        <VStack spacing={10} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              Blog & Resources
            </Heading>
            <Text fontSize="xl" maxW="2xl" mx="auto">
              Stay updated with the latest insights, tips, and trends in gym management and member retention.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {articles.map((article, index) => (
              <Box key={index} bg={cardBg} rounded="lg" overflow="hidden" shadow="md">
                <Box h="200px" bgImage={`url(${article.image})`} bgSize="cover" bgPosition="center" />
                <VStack p={6} align="start" spacing={4}>
                  <Heading as="h3" size="lg">
                    {article.title}
                  </Heading>
                  <Text>{article.excerpt}</Text>
                  <Button rightIcon={<FaArrowRight />} colorScheme="brand" variant="link">
                    Read More
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}