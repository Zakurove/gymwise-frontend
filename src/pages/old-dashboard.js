import React from 'react';
import {
  Box, Flex, Grid, Heading, Text, Icon, SimpleGrid, Progress, Button,
  useColorModeValue, Avatar, AvatarGroup, Table, Thead, Tbody, Tr, Th, Td,
  Tooltip, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, VStack, HStack, Divider, Tag, ListItem, UnorderedList
} from '@chakra-ui/react';
import { FiDollarSign, FiUsers, FiUserPlus, FiShoppingCart, FiActivity, FiClock, FiCalendar, FiAlertCircle, FiCheckCircle, FiInfo, FiTrendingUp, FiTarget, FiMail, FiAward, FiMessageCircle } from 'react-icons/fi';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const mockRevenueData = [
  { month: 'Jan', revenue: 4000, lastYear: 3500 },
  { month: 'Feb', revenue: 3000, lastYear: 2800 },
  { month: 'Mar', revenue: 5000, lastYear: 4200 },
  { month: 'Apr', revenue: 4500, lastYear: 3900 },
  { month: 'May', revenue: 6000, lastYear: 5100 },
  { month: 'Jun', revenue: 5500, lastYear: 4800 },
];

const mockActiveUsersData = [
  { name: 'Mon', users: 300 },
  { name: 'Tue', users: 450 },
  { name: 'Wed', users: 200 },
  { name: 'Thu', users: 400 },
  { name: 'Fri', users: 300 },
  { name: 'Sat', users: 450 },
  { name: 'Sun', users: 350 },
];

const mockChurnData = [
  { name: 'Safe', value: 1500, color: '#48BB78' },
  { name: 'At Risk', value: 500, color: '#ECC94B' },
  { name: 'Likely to Churn', value: 300, color: '#F56565' },
];

const StatCard = ({ title, value, icon, change, color }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box 
      bg={bgColor} 
      p={6} 
      rounded="xl" 
      shadow="xl" 
      borderWidth="1px" 
      borderColor={useColorModeValue('gray.100', 'gray.600')}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="sm" color={textColor} fontWeight="medium" mb={2}>
            {title}
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color={color}>
            {value}
          </Text>
          {change && (
            <Text fontSize="sm" color={change > 0 ? "green.500" : "red.500"} mt={2}>
              {change > 0 ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`}
            </Text>
          )}
        </Box>
        <Box p={3} bg={`${color}30`} rounded="full">
          <Icon as={icon} w={6} h={6} color={color} />
        </Box>
      </Flex>
    </Box>
  );
};

const ChurnPredictionCard = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={cardBg} p={6} rounded="xl" shadow="xl">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Member Churn Prediction</Heading>
        <Icon as={FiInfo} w={5} h={5} color="brand.500" cursor="pointer" onClick={onOpen} />
      </Flex>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={mockChurnData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {mockChurnData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <RechartsTooltip />
        </PieChart>
      </ResponsiveContainer>
      <SimpleGrid columns={3} spacing={4} mt={4}>
        {mockChurnData.map((item, index) => (
          <Box key={index}>
            <Text fontWeight="bold" color={item.color}>{item.value} {item.name}</Text>
            <Text fontSize="sm" color={textColor}>
              {index === 0 && "No action needed"}
              {index === 1 && "Consider outreach"}
              {index === 2 && "Urgent intervention"}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <Button colorScheme="brand" size="sm" mt={4} w="full">View Detailed Report</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About Churn Prediction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Our AI-driven churn prediction model analyzes member behavior patterns, attendance frequency, and engagement levels to categorize members into three risk groups:
            </Text>
            <UnorderedList mt={2}>
              <ListItem>Safe: Regular attendees with high engagement</ListItem>
              <ListItem>At Risk: Showing signs of reduced engagement</ListItem>
              <ListItem>Likely to Churn: Significant decrease in attendance and engagement</ListItem>
            </UnorderedList>
            <Text mt={2}>
              Use this information to tailor your retention strategies and personalize member experiences.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const RevenueOverview = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const currentRevenue = mockRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const lastYearRevenue = mockRevenueData.reduce((sum, item) => sum + item.lastYear, 0);
  const growthRate = ((currentRevenue - lastYearRevenue) / lastYearRevenue * 100).toFixed(1);

  return (
    <Box bg={cardBg} p={6} rounded="xl" shadow="xl">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Revenue Overview</Heading>
        <Button size="sm" colorScheme="brand">Export Report</Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
        <Stat>
          <StatLabel color={textColor}>Total Revenue</StatLabel>
          <StatNumber>${currentRevenue.toLocaleString()}</StatNumber>
          <StatHelpText>
            <StatArrow type={growthRate > 0 ? 'increase' : 'decrease'} />
            {growthRate}% from last year
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel color={textColor}>Average Monthly</StatLabel>
          <StatNumber>${(currentRevenue / 6).toLocaleString()}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel color={textColor}>Projected Annual</StatLabel>
          <StatNumber>${(currentRevenue * 2).toLocaleString()}</StatNumber>
        </Stat>
      </SimpleGrid>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={mockRevenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <RechartsTooltip />
          <Area type="monotone" dataKey="revenue" stroke="#48BB78" fill="#48BB7820" />
          <Area type="monotone" dataKey="lastYear" stroke="#4299E1" fill="#4299E120" />
        </AreaChart>
      </ResponsiveContainer>
      <Flex justifyContent="center" mt={4}>
        <Box mr={4}>
          <Icon as={FiTrendingUp} color="green.500" mr={2} />
          <Text as="span" fontWeight="bold">This Year</Text>
        </Box>
        <Box>
          <Icon as={FiTarget} color="blue.500" mr={2} />
          <Text as="span" fontWeight="bold">Last Year</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const ActiveUsersChart = () => {
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={cardBg} p={6} rounded="xl" shadow="xl">
      <Heading size="md" mb={4}>Active Users</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockActiveUsersData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <Bar dataKey="users" fill="#4299E1" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

const RetentionStrategies = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const strategies = [
    { name: 'Personalized Email Campaign', icon: FiMail, targetGroup: 'At Risk', progress: 80, impact: '+15% engagement' },
    { name: 'Loyalty Rewards Program', icon: FiAward, targetGroup: 'All Members', progress: 60, impact: '+8% retention' },
    { name: 'One-on-One Consultations', icon: FiMessageCircle, targetGroup: 'Likely to Churn', progress: 30, impact: '+25% recovery' },
  ];

  return (
    <Box bg={cardBg} p={6} rounded="xl" shadow="xl">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Retention Strategies</Heading>
        <Button size="sm" colorScheme="brand">Create New Strategy</Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {strategies.map((strategy, index) => (
          <Box key={index} p={4} borderWidth={1} borderColor={useColorModeValue('gray.200', 'gray.600')} rounded="md">
            <Flex alignItems="center" mb={2}>
              <Icon as={strategy.icon} w={6} h={6} color="brand.500" mr={3} />
              <VStack align="start" spacing={0} flex={1}>
                <Text fontWeight="bold">{strategy.name}</Text>
                <HStack>
                  <Badge colorScheme={strategy.targetGroup === 'At Risk' ? 'yellow' : strategy.targetGroup === 'Likely to Churn' ? 'red' : 'green'}>
                    {strategy.targetGroup}
                  </Badge>
                  <Text fontSize="sm" color="green.500">{strategy.impact}</Text>
                </HStack>
              </VStack>
              <Button size="sm" colorScheme="brand" variant="outline">View</Button>
            </Flex>
            <Progress value={strategy.progress} size="sm" colorScheme="brand" rounded="full" />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

const RecentActivities = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const activities = [
    { icon: FiUserPlus, text: "New member sign-up: Sarah Johnson", time: "2 hours ago", category: "New Member", action: "Welcome" },
    { icon: FiActivity, text: "High traffic alert: 85% capacity reached", time: "4 hours ago", category: "Facility", action: "Review" },
    { icon: FiClock, text: "New class added: 'HIIT Cardio' on Tuesdays", time: "Yesterday", category: "Classes", action: "Promote" },
    { icon: FiCalendar, text: "Upcoming event: Summer Fitness Challenge", time: "2 days ago", category: "Event", action: "Prepare" },
    { icon: FiAlertCircle, text: "10 members moved to 'At Risk' category", time: "3 days ago", category: "Retention", action: "Intervene" },
    { icon: FiCheckCircle, text: "Retention campaign launched for 'Likely to Churn' group", time: "4 days ago", category: "Campaign", action: "Monitor" },
  ];

  return (
    <Box bg={cardBg} p={6} rounded="xl" shadow="xl">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Recent Activities</Heading>
        <Button size="sm" colorScheme="brand">View All</Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {activities.map((activity, index) => (
          <Flex key={index} alignItems="center" p={3} borderWidth={1} borderColor={useColorModeValue('gray.200', 'gray.600')} rounded="md">
            <Icon as={activity.icon} w={6} h={6} color="brand.500" mr={4} />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontWeight="medium">{activity.text}</Text>
              <HStack>
                <Text fontSize="sm" color={textColor}>{activity.time}</Text>
                <Badge colorScheme="brand">{activity.category}</Badge>
              </HStack>
            </VStack>
            <Button size="sm" colorScheme="brand" variant="outline">{activity.action}</Button>
          </Flex>
        ))}
        </VStack>
    </Box>
  );
};

const Dashboard = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4} bg={bgColor}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading size="lg">Dashboard</Heading>
        <Text color="gray.500">Welcome back, John Doe</Text>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard title="Today's Revenue" value="$53,000" icon={FiDollarSign} change={5.5} color="green.500" />
        <StatCard title="Active Members" value="2,300" icon={FiUsers} change={3} color="blue.500" />
        <StatCard title="New Sign-ups" value="120" icon={FiUserPlus} change={-2.5} color="purple.500" />
        <StatCard title="Total Sales" value="$173,000" icon={FiShoppingCart} change={8} color="orange.500" />
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={8}>
        <ChurnPredictionCard />
        <ActiveUsersChart />
      </Grid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <RevenueOverview />
        <RetentionStrategies />
      </SimpleGrid>

      <RecentActivities />
    </Box>
  );
};

export default Dashboard;