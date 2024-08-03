// src/components/admin/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Select,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { fetchUsers, activateUser, changeUserRole } from '../../redux/admin/adminActions';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.admin);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchUsers());
      setIsDataLoaded(true);
    };
    loadData();
  }, [dispatch]);

  const handleActivateUser = async (userId) => {
    try {
      await dispatch(activateUser(userId));
      toast({
        title: 'Success',
        description: 'User activated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to activate user',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChangeUserRole = async (userId, newRole) => {
    try {
      await dispatch(changeUserRole(userId, newRole));
      toast({
        title: 'Success',
        description: 'User role updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to change user role',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeUsers = filteredUsers.filter(user => user.is_active);
  const inactiveUsers = filteredUsers.filter(user => !user.is_active);

  const UserTable = ({ users, showActivateButton }) => (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>{`${user.first_name} ${user.last_name}`}</Td>
            <Td>{user.email}</Td>
            <Td>{user.role}</Td>
            <Td>
              <HStack spacing={2}>
                {showActivateButton && (
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleActivateUser(user.id)}
                  >
                    Activate
                  </Button>
                )}
                <Select
                  size="sm"
                  value={user.role}
                  onChange={(e) => handleChangeUserRole(user.id, e.target.value)}
                  isDisabled={user.role === 'superadmin'}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  {user.role === 'superadmin' && (
                    <option value="superadmin">Superadmin</option>
                  )}
                </Select>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  if (loading || !isDataLoaded) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="lg" color="red.500">Error loading admin panel</Heading>
        <Text mt={4}>{error}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading mb={6}>Admin Panel</Heading>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <Tabs>
        <TabList>
          <Tab>Active Users ({activeUsers.length})</Tab>
          <Tab>Inactive Users ({inactiveUsers.length})</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTable users={activeUsers} showActivateButton={false} />
          </TabPanel>
          <TabPanel>
            <UserTable users={inactiveUsers} showActivateButton={true} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPanel;