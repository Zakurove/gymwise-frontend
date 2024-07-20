import React from 'react';
import { Box, Heading, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const MemberDistributionChart = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const data = [
    { name: 'Thriving', value: 600, color: '#48BB78' },
    { name: 'Fluctuating', value: 300, color: '#ECC94B' },
    { name: 'Declining', value: 100, color: '#F56565' },
  ];

  const totalMembers = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="md" mb={4}>Member Distribution</Heading>
      <Text fontSize="sm" color={textColor} mb={4}>Total Members: {totalMembers}</Text>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
      <Flex justifyContent="space-around" mt={4}>
        {data.map((item, index) => (
          <Box key={index} textAlign="center">
            <Text fontWeight="bold" color={item.color}>{item.value}</Text>
            <Text fontSize="sm" color={textColor}>{item.name}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default MemberDistributionChart;