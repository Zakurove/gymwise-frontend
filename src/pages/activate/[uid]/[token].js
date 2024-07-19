import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Heading, Text, VStack, Spinner } from '@chakra-ui/react';

const ActivationPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const { uid, token } = router.query;
    if (uid && token) {
      axios.get(`http://localhost:8000/api/activate/${uid}/${token}/`)
        .then(() => {
          setStatus('success');
        })
        .catch(() => {
          setStatus('error');
        });
    }
  }, [router.query]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4} align="center">
        <Heading>{status === 'success' ? 'Email Confirmed' : 'Activation Failed'}</Heading>
        <Text>
          {status === 'success' 
            ? 'Your email has been confirmed. An admin from your institution will activate your account shortly.' 
            : 'There was an error activating your account. Please try again or contact support.'}
        </Text>
      </VStack>
    </Box>
  );
};

export default ActivationPage;