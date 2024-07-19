// components/PasswordRequirements.js
import React from 'react';
import { Text, VStack, HStack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

const Requirement = ({ isMet, text }) => (
  <HStack>
    {isMet ? (
      <CheckIcon color="green.500" />
    ) : (
      <CloseIcon color="red.500" />
    )}
    <Text color={isMet ? "green.500" : "red.500"}>{text}</Text>
  </HStack>
);

const PasswordRequirements = ({ password }) => {
  const requirements = [
    { re: /.{8,}/, text: "At least 8 characters long" },
    { re: /[A-Z]/, text: "At least one uppercase letter" },
    { re: /[a-z]/, text: "At least one lowercase letter" },
    { re: /[0-9]/, text: "At least one number" },
    { re: /[^A-Za-z0-9]/, text: "At least one special character" },
  ];

  return (
    <VStack align="start" spacing={1} mt={2}>
      {requirements.map((req, index) => (
        <Requirement 
          key={index} 
          isMet={password && req.re.test(password)} 
          text={req.text} 
        />
      ))}
    </VStack>
  );
};

export default PasswordRequirements;