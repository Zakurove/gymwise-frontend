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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuth();
  const bg = useColorModeValue('white', '#002060');
  const color = useColorModeValue('#002060', 'white');

  const NavLink = ({ children, href }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{ textDecoration: 'none', bg: useColorModeValue('#e0f7fa', '#003049'), color: '#002060' }}
      onClick={() => { router.push(href); onClose(); }}
    >
      {children}
    </Link>
  );

  const NavLinks = () => (
    <>
      <NavLink href="/">Homee</NavLink>
      <NavLink href="/about-us">About Us</NavLink>
      <NavLink href="/contact-us">Contact Us</NavLink>
      <NavLink href="/book-demo">Book a Demo</NavLink>
      <NavLink href="/blog">Blog</NavLink>
      {user ? (
        <>
          <Button
            px={2}
            py={1}
            rounded={'md'}
            colorScheme="teal"
            onClick={() => logout()}
          >
            Logout
          </Button>
          <NavLink href="/dashboard">Dashboard</NavLink>
          {(user.role === 'superadmin' || user.role === 'admin') && (
            <NavLink href="/admin/panel">Admin Panel</NavLink>
          )}
        </>
      ) : (
        <>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/register">Register</NavLink>
        </>
      )}
    </>
  );

  return (
    <Box bg={bg} px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box cursor="pointer" onClick={() => router.push('/')}>
            <Image src="/images/logo.png" alt="GymWise Logo" maxWidth="130px" />
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }} color={color}>
            <NavLinks />
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <IconButton 
            size="md" 
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} 
            aria-label="Toggle Color Mode" 
            onClick={toggleColorMode} 
            mr={4} 
          />
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <VStack as={'nav'} spacing={4}>
            <NavLinks />
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;