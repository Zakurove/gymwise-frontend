import React, { useState } from 'react';
import { Box, Heading, Text, Flex, Button, SimpleGrid, useColorModeValue, Icon, VStack, HStack, Badge } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { FiInfo, FiAlertCircle, FiUserCheck, FiUserX } from 'react-icons/fi';

const MemberDistributionChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const data = [
    { name: 'Thriving', value: 1500, color: '#48BB78', icon: FiUserCheck, description: 'No action needed' },
    { name: 'At Risk', value: 500, color: '#ECC94B', icon: FiAlertCircle, description: 'Consider outreach' },
    { name: 'Likely to Churn', value: 300, color: '#F56565', icon: FiUserX, description: 'Urgent intervention' },
  ];

  const totalMembers = data.reduce((sum, item) => sum + item.value, 0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} members`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <Box bg={bgColor} p={8}  boxShadow="2xl">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg" color="brand.500">AI-Powered Member Distribution</Heading>
        <Icon as={FiInfo} w={6} h={6} color="brand.500" cursor="pointer" />
      </Flex>
      <Text fontSize="md" fontWeight="medium" mb={6}>
        Our advanced AI model categorizes members based on their engagement levels and likelihood to churn.
      </Text>
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Box flex={1} height="300px">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <VStack flex={1} align="stretch" spacing={4}>
          {data.map((item, index) => (
            <HStack key={index} p={3} bg={`${item.color}20`} borderRadius="md">
              <Icon as={item.icon} w={6} h={6} color={item.color} />
              <Box>
                <Text fontWeight="bold" color={item.color}>
                  {item.value} {item.name}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  {item.description}
                </Text>
              </Box>
              <Badge colorScheme={item.color.replace('#', '')} ml="auto">
                {((item.value / totalMembers) * 100).toFixed(1)}%
              </Badge>
            </HStack>
          ))}
        </VStack>
      </Flex>
      <Button colorScheme="brand" size="lg" mt={6} width="full">
        View Detailed AI Insights
      </Button>
    </Box>
  );
};

export default MemberDistributionChart;