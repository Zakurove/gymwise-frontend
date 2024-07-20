import React from "react";
import {
  Box,
  VStack,
  Link,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Icon,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { FaHome, FaChartLine, FaUsers, FaCog, FaBullhorn, FaFileAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { user } = useAuth();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  
  const isMobile = useBreakpointValue({ base: true, md: false });

  const NavLink = ({ icon, children, href }) => {
    const isActive = router.pathname === href;

    const handleClick = (e) => {
      e.preventDefault();
      if (!isActive) {
        router.push(href);
      }
      if (isMobile) {
        onClose();
      }
    };

    return (
      <Link
        href={href}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        onClick={handleClick}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? hoverBg : 'transparent'}
          color={isActive ? 'brand.500' : color}
          _hover={{
            bg: hoverBg,
            color: 'brand.500',
          }}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'brand.500',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };

  const SidebarContent = (
    <VStack align="stretch" spacing={1}>
      <NavLink icon={FaHome} href="/dashboard">Dashboard & Revenue</NavLink>
      <NavLink icon={FaUsers} href="/member-insights">Member Insights & Retention</NavLink>
      <NavLink icon={FaBullhorn} href="/engagement">Engagement Orchestrator</NavLink>
      <NavLink icon={FaFileAlt} href="/reports">Reports & Analytics</NavLink>
      {(user?.role === 'superadmin' || user?.role === 'admin') && (
        <NavLink icon={FaCog} href="/admin/panel">Admin Panel</NavLink>
      )}
    </VStack>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <Box
        display={{ base: "none", md: "block" }}
        w="240px"
        bg={bg}
        color={color}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        pos="fixed"
        h="full"
        pt="20"
      >
        <VStack align="stretch" spacing={5}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="brand.500">GymWise</Text>
          {SidebarContent}
        </VStack>
      </Box>

      {/* Mobile sidebar */}
      {isMobile && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent bg={bg} color={color}>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                <Text fontSize="2xl" fontWeight="bold" color="brand.500">GymWise</Text>
              </DrawerHeader>
              <DrawerBody>
                {SidebarContent}
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;