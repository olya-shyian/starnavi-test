"use client";

import { Box, Heading, Text, Button, Center } from "@chakra-ui/react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => (
  <Center h="100vh">
    <Box
      p="6"
      maxW="400px"
      mx="auto"
      bg="red.100"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      textAlign="center"
    >
      <Heading as="h2" size="md" mb="2">
        Oops! Something went wrong.
      </Heading>

      <Text fontSize="lg" mb="4">
        {error.message}
      </Text>

      <Button colorScheme="red" onClick={reset}>
        Try Again
      </Button>
    </Box>
  </Center>
);

export default Error;
