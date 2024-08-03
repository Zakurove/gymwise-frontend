// src/components/layout/PublicNavbar.js

import React from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorMode,
  useColorModeValue,
  HStack,
  IconButton,
  Image,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Spacer,
  Container,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const PublicNavbar = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  const NavLink = ({ children, href }) => (
    <Link
      px={3}
      py={2}
      rounded={'md'}
      color={color}
      fontWeight="medium"
      _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.100', 'gray.700') }}
      onClick={() => { router.push(href); onClose(); }}
    >
      {children}
    </Link>
  );

  const MainNavLinks = () => (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about-us">About Us</NavLink>
      <NavLink href="/contact-us">Contact Us</NavLink>
    </>
  );

  const AuthNavLinks = () => (
    <>
      <Button
        variant="outline"
        colorScheme="brand"
        size="sm"
        onClick={() => router.push('/login')}
      >
        Login
      </Button>
      <Button
        variant="outline"
        colorScheme="brand"
        size="sm"
        onClick={() => router.push('/register')}
      >
        Register
      </Button>
    </>
  );

  return (
    <Box bg={bg} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Box cursor="pointer" onClick={() => router.push('/')}>
              <Image src="/images/logo.png" alt="GymWise Logo" maxWidth="130px" />
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <MainNavLinks />
            </HStack>
          </HStack>
          <Spacer />
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <AuthNavLinks />
            <IconButton
              size="md"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="brand"
            />
          </HStack>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            colorScheme="brand"
          />
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <VStack spacing={4} mt={16} p={4}>
            <MainNavLinks />
            <AuthNavLinks />
          </VStack>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default PublicNavbar;