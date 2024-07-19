import { Box, Container, Heading, Text, Button, Stack, SimpleGrid, Icon, VStack, HStack, useColorModeValue, Flex, Divider, Badge } from "@chakra-ui/react";
import { FaChartLine, FaUserFriends, FaRobot, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const features = [
  {
    title: "AI-Powered Churn Prediction",
    icon: FaRobot,
    description: "Harness the power of machine learning to identify at-risk members before they leave."
  },
  {
    title: "Personalized Engagement",
    icon: FaUserFriends,
    description: "Tailor your communication and offers to each member's unique preferences and behaviors."
  },
  {
    title: "Data-Driven Insights",
    icon: FaChartLine,
    description: "Make informed decisions with comprehensive analytics and actionable reports."
  }
];

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const accentColor = useColorModeValue("brand.500", "brand.300");

  return (
    <Box>
      <Box bg={bgColor} py={20}>
        <Container maxW="container.xl">
          <Stack direction={{ base: "column", lg: "row" }} spacing={16} alignItems="center">
            <VStack spacing={8} align="flex-start" maxW="lg">
              <Badge colorScheme="brand" fontSize="md" px={3} py={1} rounded="full">AI-Powered Solutions</Badge>
              <Heading as="h1" size="3xl" fontWeight="bold" lineHeight="shorter">
                Revolutionize Your Gym's{" "}
                <Text as="span" color={accentColor}>
                  Member Retention
                </Text>
              </Heading>
              <Text fontSize="xl" color={useColorModeValue("gray.600", "gray.300")}>
                GymWise empowers fitness businesses with AI-driven insights to boost member engagement, reduce churn, and maximize revenue.
              </Text>
              <Button 
                size="lg" 
                colorScheme="brand" 
                
                onClick={() => router.push('/book-demo')}
                px={8}
                fontSize="lg"
                align="center"
                fontWeight="bold"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                Book a Free Demo
              </Button>
            </VStack>
            <div 
              boxSize={{ base: "sm", md: "md", lg: "lg" }} 
              position="relative" 
              overflow="hidden" 
              rounded="2xl" 
              shadow="2xl"
            >
              <Image src="/images/horizon-dashboard.png" alt="GymWise Dashboard" width={600} height={400} objectFit="cover" />
              {/* <Box 
                position="absolute" 
                top={0} 
                left={0} 
                right={0} 
                bottom={0} 
                // bg="brand.500" 
                // opacity={0.1} 
              /> */}
            </div>
          </Stack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={20}>
        <VStack spacing={20}>
          <VStack spacing={5}>
            <Heading as="h2" size="2xl" textAlign="center">
              Empower Your Gym with{" "}
              <Text as="span" color={accentColor}>
                Data-Driven Intelligence
              </Text>
            </Heading>
            <Text fontSize="xl" textAlign="center" maxW="2xl" color={useColorModeValue("gray.600", "gray.300")}>
              GymWise leverages cutting-edge AI to transform your member data into actionable strategies, helping you retain members and grow your business.
            </Text>
          </VStack>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            {features.map((feature, index) => (
              <VStack 
                key={index}
                bg={cardBg}
                p={8}
                rounded="xl"
                shadow="xl"
                spacing={6}
                align="flex-start"
                borderTop="4px solid"
                borderColor="brand.500"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)", shadow: "2xl" }}
              >
                <Flex align="center" justify="center" w={16} h={16} rounded="full" bg={useColorModeValue("brand.100", "brand.900")}>
                  <Icon as={feature.icon} w={8} h={8} color="brand.500" />
                </Flex>
                <Heading as="h3" size="lg">{feature.title}</Heading>
                <Divider borderColor={useColorModeValue("gray.200", "gray.700")} />
                <Text color={useColorModeValue("gray.600", "gray.300")} fontSize="lg">{feature.description}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}