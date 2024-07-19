import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Link,
  HStack,
  VStack,
  Icon,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Footer = () => {
  const bgColor = useColorModeValue("gray.800", "gray.900");
  const textColor = useColorModeValue("gray.100", "gray.200");
  const linkColor = useColorModeValue("teal.200", "teal.300");

  return (
    <MotionBox
      as="footer"
      bg={bgColor}
      color={textColor}
      py={10}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          <VStack align="start" spacing={3}>
            <Text fontSize="2xl" fontWeight="bold" bgGradient="linear(to-r, cyan.400, blue.500, purple.600)" bgClip="text">
              GymWise
            </Text>
            <Text fontSize="sm">Insight-Driven Success</Text>
          </VStack>

          <VStack align="start" spacing={3}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>Quick Links</Text>
            {["About Us", "Contact Us", "Book a Demo"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                color={linkColor}
                _hover={{ color: "white", textDecoration: "none" }}
                transition="color 0.2s"
              >
                {item}
              </Link>
            ))}
          </VStack>

          <VStack align="start" spacing={3}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>Contact Us</Text>
            <Text fontSize="sm">Riyadh, Saudi Arabia</Text>
            <Text fontSize="sm">Email: contact@gymwise.com</Text>
            <Text fontSize="sm">Phone: +966 502556166</Text>
          </VStack>

          <VStack align="start" spacing={3}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>Follow Us</Text>
            <HStack spacing={4}>
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((SocialIcon, index) => (
                <MotionBox
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="#" isExternal>
                    <Icon
                      as={SocialIcon}
                      w={6}
                      h={6}
                      color={linkColor}
                      _hover={{ color: "white" }}
                      transition="color 0.2s"
                    />
                  </Link>
                </MotionBox>
              ))}
            </HStack>
          </VStack>
        </SimpleGrid>

        <Divider my={8} borderColor="gray.600" />

        <HStack justify="space-between" flexWrap="wrap">
          <Text fontSize="sm">&copy; {new Date().getFullYear()} GymWise. All rights reserved.</Text>

        </HStack>
      </Container>
    </MotionBox>
  );
};

export default Footer;