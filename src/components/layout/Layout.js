// src/components/layout/Layout.js
import React, { useEffect } from 'react';
import { Box, useDisclosure } from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import AuthNavbar from "./AuthNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import PublicNavbar from "./PublicNavbar";
import LoadingSpinner from "./LoadingSpinner";
import { fetchUser } from "../../redux/auth/authActions";

const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/reset-password/[uid]/[token]',
  '/activate/[uid]/[token]',
  '/about-us',
  '/contact-us',
  '/book-demo',
  '/registration-success',
  '/features',
  '/blog'
];

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const isPublicRoute = publicRoutes.includes(router.pathname) || 
    router.pathname.startsWith('/reset-password/') ||
    router.pathname.startsWith('/activate/');

  if (!user && !isPublicRoute) {
    router.push('/login');
    return null;
  }

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {user && !isPublicRoute ? (
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