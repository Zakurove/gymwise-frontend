import React from "react";
import { useSelector, useDispatch } from 'react-redux';
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
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import AINotifications from "../AINotifications";
import { logoutUser } from "../../redux/auth/authActions";

const AuthNavbar = ({ onToggleSidebar }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useSelector(state => state.auth);
  const bg = useColorModeValue('white', '#002060');

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

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
          {user?.institution && (
            <Text mr={4} fontWeight="medium" color={useColorModeValue("gray.600", "gray.300")}>
              {user.institution.name}
            </Text>
          )}
          <AINotifications />
          <IconButton
            size="md"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            mr={4}
          />
          <Menu>
            <MenuButton as={Avatar} size="sm" src={user?.avatarUrl} cursor="pointer" />
            <MenuList>
              <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
              <MenuItem onClick={() => router.push('/settings')}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AuthNavbar;