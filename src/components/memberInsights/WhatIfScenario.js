import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Tooltip,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const WhatIfScenario = () => {
  const [scenarioParams, setScenarioParams] = useState({
    membership_price_change: 0,
    new_classes: 0,
    gym_hours_change: 0,
    marketing_intensity: 1,
    facility_improvement: 0,
    staff_training: 0,
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSliderChange = (name, value) => {
    setScenarioParams(prev => ({ ...prev, [name]: value }));
  };

  const runScenario = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/ai/what-if-scenario/', { scenario_params: scenarioParams });
      setResults(response.data);
    } catch (error) {
      console.error("Error running scenario:", error);
      setError(error.response?.data?.error || "An error occurred while running the scenario");
    } finally {
      setLoading(false);
    }
  };

  const chartData = results ? [
    { name: 'Current', retention: results.current_retention_rate * 100 },
    { name: 'Scenario', retention: results.scenario_retention_rate * 100 },
  ] : [];

  return (
    <Box bg={bgColor} p={6} borderRadius="xl" borderWidth={1} borderColor={borderColor} boxShadow="xl">
      <Heading size="lg" mb={6}>What-If Scenario Analysis</Heading>
      <VStack spacing={6} align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <ScenarioSlider
            name="membership_price_change"
            label="Membership Price Change"
            value={scenarioParams.membership_price_change}
            onChange={handleSliderChange}
            min={-0.5}
            max={0.5}
            step={0.01}
            tooltip="Adjust membership price (e.g., -0.1 for 10% decrease, 0.1 for 10% increase). This simulates how price changes might affect member retention."
          />
          <ScenarioSlider
            name="new_classes"
            label="New Classes"
            value={scenarioParams.new_classes}
            onChange={handleSliderChange}
            min={0}
            max={10}
            step={1}
            tooltip="Number of new classes to add. This simulates how increasing class variety might impact member engagement and retention."
          />
          <ScenarioSlider
            name="gym_hours_change"
            label="Gym Hours Change"
            value={scenarioParams.gym_hours_change}
            onChange={handleSliderChange}
            min={-4}
            max={4}
            step={1}
            tooltip="Change in gym opening hours per day. This simulates how extended or reduced hours might affect member satisfaction and retention."
          />
          <ScenarioSlider
            name="marketing_intensity"
            label="Marketing Intensity"
            value={scenarioParams.marketing_intensity}
            onChange={handleSliderChange}
            min={0.5}
            max={2}
            step={0.1}
            tooltip="Adjust marketing efforts (1 is current level, 2 is doubling efforts). This simulates how increased marketing might affect new member acquisition and retention."
          />
          <ScenarioSlider
            name="facility_improvement"
            label="Facility Improvement"
            value={scenarioParams.facility_improvement}
            onChange={handleSliderChange}
            min={0}
            max={0.5}
            step={0.01}
            tooltip="Facility improvement score (0.1 is 10% improvement). This simulates how upgrades to gym equipment or amenities might impact member satisfaction and retention."
          />
          <ScenarioSlider
            name="staff_training"
            label="Staff Training"
            value={scenarioParams.staff_training}
            onChange={handleSliderChange}
            min={0}
            max={0.5}
            step={0.01}
            tooltip="Staff training intensity (0.1 is 10% increase in training). This simulates how improved staff knowledge and service might affect member experience and retention."
          />
        </SimpleGrid>
        <Button colorScheme="brand" onClick={runScenario} isLoading={loading}>
          Run Scenario
        </Button>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {results && (
          <>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Stat>
                <StatLabel>Current Retention Rate</StatLabel>
                <StatNumber>{(results.current_retention_rate * 100).toFixed(2)}%</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Scenario Retention Rate</StatLabel>
                <StatNumber>{(results.scenario_retention_rate * 100).toFixed(2)}%</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Change in Retention</StatLabel>
                <StatNumber>
                  <StatArrow type={results.retention_rate_change >= 0 ? 'increase' : 'decrease'} />
                  {(Math.abs(results.retention_rate_change) * 100).toFixed(2)}%
                </StatNumber>
                <StatHelpText>
                  {results.retention_rate_change >= 0 ? 'Improvement' : 'Decline'}
                </StatHelpText>
              </Stat>
            </SimpleGrid>
            <Box h="300px" mt={6}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="retention" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </VStack>
    </Box>
  );
};

const ScenarioSlider = ({ name, label, value, onChange, min, max, step, tooltip }) => {
  return (
    <Box>
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="medium">{label}</Text>
        <Tooltip label={tooltip} placement="top" hasArrow>
          <Box as={FiInfo} />
        </Tooltip>
      </HStack>
      <Slider
        value={value}
        onChange={(v) => onChange(name, v)}
        min={min}
        max={max}
        step={step}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <Text textAlign="right" mt={1}>
        {value.toFixed(2)}
      </Text>
    </Box>
  );
};

export default WhatIfScenario;