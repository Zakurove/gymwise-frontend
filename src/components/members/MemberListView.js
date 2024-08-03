import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Button,
  useColorModeValue,
  Spinner,
  Select,
  Flex,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import axios from '../../utils/axiosConfig';
import { useRouter } from 'next/router';

const MemberListView = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    fetchMembers();
  }, [page, sortBy, sortOrder, searchTerm]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/ai/member-insights/', {
        params: {
          page,
          sort_by: sortBy,
          sort_order: sortOrder,
          search: searchTerm,
        },
      });
      setMembers(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 items per page
    } catch (error) {
      console.error('Error fetching members:', error);
    }
    setLoading(false);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMembers();
  };

  const handleViewDetails = (memberId) => {
    router.push(`/members/${memberId}`);
  };

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="lg" mb={6}>Member List</Heading>
      <Flex mb={4}>
        <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
          <Input
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mr={2}
          />
          <IconButton
            type="submit"
            aria-label="Search members"
            icon={<SearchIcon />}
            colorScheme="brand"
          />
        </form>
      </Flex>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th cursor="pointer" onClick={() => handleSort('name')}>
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                </Th>
                <Th cursor="pointer" onClick={() => handleSort('email')}>
                  Email {sortBy === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                </Th>
                <Th cursor="pointer" onClick={() => handleSort('churn_risk')}>
                  Churn Risk {sortBy === 'churn_risk' && (sortOrder === 'asc' ? '▲' : '▼')}
                </Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {members.map((member) => (
                <Tr key={member.id}>
                  <Td>{member.name}</Td>
                  <Td>{member.email}</Td>
                  <Td>{member.churn_risk}</Td>
                  <Td>
                    <Button size="sm" onClick={() => handleViewDetails(member.id)}>
                      View Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justify="space-between" mt={4}>
            <Button
              leftIcon={<ChevronLeftIcon />}
              onClick={() => setPage(page - 1)}
              isDisabled={page === 1}
            >
              Previous
            </Button>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              width="auto"
              ml={2}
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="churn_risk">Sort by Churn Risk</option>
            </Select>
            <Button
              rightIcon={<ChevronRightIcon />}
              onClick={() => setPage(page + 1)}
              isDisabled={page === totalPages}
            >
              Next
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default MemberListView;