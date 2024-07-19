// components/layout/AuthNavbar.js
import React from "react";
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const AuthNavbar = ({ onToggleSidebar }) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const bg = useColorModeValue('white', '#002060');

  return (
    <Box bg={bg} px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
            mr={4}
          />
          <Box cursor="pointer" onClick={() => router.push('/dashboard')}>
            <Image src="/images/logo.png" alt="GymWise Logo" maxWidth="130px" />
          </Box>
        </Flex>
        <Flex alignItems="center">
          <IconButton
            size="md"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            mr={4}
          />
          <Menu>
            <MenuButton as={Avatar} size="sm" src={user.avatarUrl} cursor="pointer" />
            <MenuList>
              <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
              <MenuItem onClick={() => router.push('/settings')}>Settings</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AuthNavbar;