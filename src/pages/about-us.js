import { Box, Container, Heading, Text, Stack, VStack, Image, SimpleGrid, useColorModeValue, Icon, Flex, Button, Divider } from "@chakra-ui/react";
import { FaRocket, FaEye, FaUsers, FaLightbulb, FaHandshake, FaTrophy } from "react-icons/fa";
import { useRouter } from "next/router";

const values = [
  { title: "Innovation", icon: FaLightbulb, description: "We constantly push boundaries to deliver cutting-edge solutions." },
  { title: "Integrity", icon: FaHandshake, description: "We build trust through transparent and ethical practices." },
  { title: "Excellence", icon: FaTrophy, description: "We strive for the highest quality in everything we do." },
  { title: "Customer Success", icon: FaUsers, description: "Your success is our success. We're dedicated to your growth." },
];

export default function AboutUs() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const accentColor = useColorModeValue("brand.500", "brand.300");
  const router = useRouter();

  return (
    <Box bg={bgColor}>
      <Container maxW="container.xl" py={20}>
        <VStack spacing={20} align="stretch">
          <VStack spacing={8} textAlign="center">
            <Heading as="h1" size="3xl" fontWeight="bold">
              Transforming the{" "}
              <Text as="span" color={accentColor}>
                Fitness Industry
              </Text>
            </Heading>
            <Text fontSize="xl" maxW="3xl" mx="auto" color={useColorModeValue("gray.600", "gray.300")}>
              At GymWise, we're on a mission to revolutionize how gyms engage with their members. Through innovative technology and data-driven insights, we empower fitness businesses to thrive in an ever-evolving industry.
            </Text>
          </VStack>

          <Stack direction={{ base: "column", lg: "row" }} spacing={16} align="center">
            <Box 
              flex={1} 
              position="relative" 
              height="400px" 
              width="100%" 
              overflow="hidden" 
              rounded="2xl" 
              shadow="2xl"
            >
              <Image 
                src="/images/code.jpg" 
                alt="GymWise Team" 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center"
              />
            </Box>
            <VStack align="start" spacing={8} flex={1}>
              <Heading as="h2" size="2xl" color={accentColor}>
                Our Story
              </Heading>
              <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                Founded in 2024, GymWise was born from a simple observation: gyms were struggling to retain members and maximize their potential. Our founders, with backgrounds in digital transformation, fitness and technology, saw an opportunity to bridge this gap.
              </Text>
              <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                Today, GymWise is at the forefront of the fitness technology revolution, serving hundreds of gyms worldwide and continually innovating to meet the evolving needs of the industry.
              </Text>
            </VStack>
          </Stack>

          <VStack spacing={12}>
            <Heading as="h2" size="2xl" textAlign="center">
              Our Mission and Vision
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
              <Box bg={cardBg} p={10} rounded="xl" shadow="xl">
                <VStack align="start" spacing={6}>
                  <Flex align="center" justify="center" w={20} h={20} rounded="full" bg={useColorModeValue("brand.100", "brand.900")}>
                    <Icon as={FaRocket} w={10} h={10} color={accentColor} />
                  </Flex>
                  <Heading as="h3" size="xl">Our Mission</Heading>
                  <Divider borderColor={useColorModeValue("gray.200", "gray.700")} />
                  <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                    To empower gyms with innovative solutions that drive member retention, satisfaction, and business growth.
                  </Text>
                </VStack>
              </Box>
              <Box bg={cardBg} p={10} rounded="xl" shadow="xl">
                <VStack align="start" spacing={6}>
                  <Flex align="center" justify="center" w={20} h={20} rounded="full" bg={useColorModeValue("brand.100", "brand.900")}>
                    <Icon as={FaEye} w={10} h={10} color={accentColor} />
                  </Flex>
                  <Heading as="h3" size="xl">Our Vision</Heading>
                  <Divider borderColor={useColorModeValue("gray.200", "gray.700")} />
                  <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                    To be the global leader in gym management solutions, setting the standard for member engagement and retention in the fitness industry.
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>

          <VStack spacing={12}>
            <Heading as="h2" size="2xl" textAlign="center">
              Our Values
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {values.map((value, index) => (
                <VStack 
                  key={index} 
                  bg={cardBg} 
                  p={8} 
                  rounded="xl" 
                  shadow="xl" 
                  align="start" 
                  spacing={6}
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-5px)", shadow: "2xl" }}
                >
                  <Flex align="center" justify="center" w={16} h={16} rounded="full" bg={useColorModeValue("brand.100", "brand.900")}>
                    <Icon as={value.icon} w={8} h={8} color={accentColor} />
                  </Flex>
                  <Heading as="h3" size="lg">{value.title}</Heading>
                  <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>{value.description}</Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>


        </VStack>
      </Container>
    </Box>
  );
}