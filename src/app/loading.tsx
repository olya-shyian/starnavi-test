import { Center, Spinner } from "@chakra-ui/react";

const Loading = () => (
  <Center height={"100vh"}>
    <Spinner thickness="3px" color="blue.500" size="xl" />
  </Center>
);

export default Loading;
