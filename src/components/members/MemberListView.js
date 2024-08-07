import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Flex,
  Input,
  IconButton,
  Text,
  Badge,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { fetchMembers } from '../../redux/members/membersActions';

const MemberListView = () => {
  const dispatch = useDispatch();
  const { members, loading, error, totalPages, currentPage } = useSelector(state => state.members);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    dispatch(fetchMembers({ page: currentPage, sort_by: sortBy, sort_order: sortOrder, search: searchTerm }));
  }, [dispatch, currentPage, sortBy, sortOrder, searchTerm]);

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
    dispatch(fetchMembers({ page: 1, sort_by: sortBy, sort_order: sortOrder, search: searchTerm }));
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchMembers({ page: newPage, sort_by: sortBy, sort_order: sortOrder, search: searchTerm }));
  };

  const handleViewDetails = (memberId) => {
    router.push(`/members/${memberId}`);
  };

  const getChurnRiskBadge = (risk) => {
    const color = risk === 'high' ? 'red' : risk === 'medium' ? 'yellow' : 'green';
    return <Badge colorScheme={color}>{risk}</Badge>;
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

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
              <Td>{getChurnRiskBadge(member.churn_risk)}</Td>
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
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
        <Button
          rightIcon={<ChevronRightIcon />}
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default MemberListView;