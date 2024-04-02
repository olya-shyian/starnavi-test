"use client";

import { ChakraProvider } from "@chakra-ui/react";

// A wrapper component that provides the Chakra UI theme and global styles
// to its children components. Other providers can be added here.
export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);
