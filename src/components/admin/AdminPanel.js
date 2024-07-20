import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AdminPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/pending-users/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPendingUsers(response.data);
    } catch (error) {
      console.error('Error fetching pending users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pending users',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const activateUser = async (userId) => {
    try {
      await axios.post(`http://localhost:8000/api/activate-user/${userId}/`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast({
        title: 'Success',
        description: 'User activated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchPendingUsers();
    } catch (error) {
      console.error('Error activating user:', error);
      toast({
        title: 'Error',
        description: 'Failed to activate user',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading mb={6}>Admin Panel</Heading>
      <Heading size="md" mb={4}>Pending Users</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pendingUsers.map((pendingUser) => (
            <Tr key={pendingUser.id}>
              <Td>{`${pendingUser.first_name} ${pendingUser.last_name}`}</Td>
              <Td>{pendingUser.email}</Td>
              <Td>
                <Button
                  colorScheme="green"
                  onClick={() => activateUser(pendingUser.id)}
                >
                  Activate
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminPanel;