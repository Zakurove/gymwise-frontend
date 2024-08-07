// src/components/data-management/ColumnMappingStep.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  VStack, 
  HStack,
  Text, 
  Button, 
  Input, 
  useColorModeValue,
  Heading,
  Flex,
  Icon,
  Tooltip,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FiSave, FiHelpCircle, FiPlus } from 'react-icons/fi';
import { fetchMappingTemplates, saveMappingTemplate, updateMapping } from '../../redux/members/membersActions';

const ColumnMappingStep = ({ onValidityChange = () => {} }) => {
  const dispatch = useDispatch();
  const { mapping, mappingTemplates, columns } = useSelector(state => state.members);
  const [templateName, setTemplateName] = useState('');
  const [currentMapping, setCurrentMapping] = useState({});
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const expectedFields = [
    'name', 'email','gender', 'Near_Location', 'Partner', 'Promo_friends', 'Phone', 
    'Contract_period', 'Group_visits', 'Age', 'Avg_additional_charges_total', 
    'Month_to_end_contract', 'Lifetime', 'Avg_class_frequency_total', 
    'Avg_class_frequency_current_month'
  ];
  useEffect(() => {
    dispatch(fetchMappingTemplates());
  }, [dispatch]);

  useEffect(() => {
    setCurrentMapping(mapping);
  }, [mapping]);

  useEffect(() => {
    const isValid = selectedTemplateId !== '' || Object.keys(currentMapping).length > 0;
    if (typeof onValidityChange === 'function') {
      onValidityChange(isValid);
    }
  }, [selectedTemplateId, currentMapping, onValidityChange]);

  const handleTemplateSelect = (e) => {
    const templateId = e.target.value;
    setSelectedTemplateId(templateId);
    if (templateId) {
      const template = mappingTemplates.find(t => t.id === parseInt(templateId));
      if (template && template.mapping) {
        setCurrentMapping(template.mapping);
        dispatch(updateMapping(template.mapping));
      }
    } else {
      setCurrentMapping({});
      dispatch(updateMapping({}));
    }
  };

  const handleMappingChange = (csvColumn, mappedColumn) => {
    const newMapping = { ...currentMapping, [csvColumn]: mappedColumn };
    setCurrentMapping(newMapping);
    dispatch(updateMapping(newMapping));
  };

  const handleSaveTemplate = () => {
    if (templateName) {
      dispatch(saveMappingTemplate({ name: templateName, mapping: currentMapping }))
        .then(() => {
          setTemplateName('');
          onClose();
          dispatch(fetchMappingTemplates());  // Refresh the list of templates
        });
    }
  };

  if (!columns || columns.length === 0) {
    return <Text>No columns available. Please upload a CSV file first.</Text>;
  }

  return (
    <Box bg={bgColor} p={6} borderRadius="md" borderWidth={1} borderColor={borderColor} boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Flex align="center" justify="space-between">
          <Heading size="md">Column Mapping</Heading>
          <Tooltip label="Map your CSV columns to GymWise fields">
            <span>
              <Icon as={FiHelpCircle} color="gray.500" />
            </span>
          </Tooltip>
        </Flex>

        <HStack spacing={4}>
          <Select 
            placeholder="Select a template" 
            value={selectedTemplateId}
            onChange={handleTemplateSelect}
            flex={1}
          >
            <option value="">Create New Template</option>
            {mappingTemplates.map(template => (
              <option key={template.id} value={template.id}>{template.name}</option>
            ))}
          </Select>
          <Button 
            leftIcon={<Icon as={FiPlus} />} 
            colorScheme="blue" 
            onClick={onOpen}
          >
            Save Template
          </Button>
        </HStack>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>CSV Column</Th>
              <Th>Mapped To</Th>
            </Tr>
          </Thead>
          <Tbody>
            {columns.map(column => (
              <Tr key={column}>
              <Td>{column}</Td>
              <Td>
                <Select 
                  value={currentMapping[column] || ''} 
                  onChange={(e) => handleMappingChange(column, e.target.value)}
                  size="sm"
                >
                  <option value="">Select field</option>
                  {expectedFields.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                  <option value={`extended.${column}`}>Extended: {column}</option>
                </Select>
              </Td>
            </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Mapping Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              placeholder="Enter template name" 
              value={templateName} 
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveTemplate}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ColumnMappingStep;