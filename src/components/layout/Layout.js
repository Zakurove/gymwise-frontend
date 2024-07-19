// components/layout/Layout.js
import React, { useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import PublicNavbar from "./PublicNavbar";
import AuthNavbar from "./AuthNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useAuth } from "../../context/AuthContext";

const Layout = ({ children }) => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {user ? (
        <>
          <AuthNavbar onToggleSidebar={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
          <Box ml={{ base: 0, md: 64 }} flex="1" mt="4rem">
            {children}
          </Box>
        </>
      ) : (
        <>
          <PublicNavbar />
          <Box flex="1">{children}</Box>
        </>
      )}
      <Footer />
    </Box>
  );
};

export default Layout;