import React from "react";
import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import { IHeroe } from "@/app/interfaces/IHeroe";
import Link from "next/link";
import { createQueryString, getIdFromUrl } from "@/app/utils/generalUtils";
import { useSearchParams } from "next/navigation";

interface HeroesListProps {
  people: IHeroe[];
}

const HeroesList = ({ people }: HeroesListProps) => {
  const searchParams = useSearchParams();

  return (
    <Box m={10} p={3} height={430} borderWidth={2} borderRadius={6}>
      {people.map((data, index) => {
        const { name, url } = data;

        const heroesId = getIdFromUrl(url);
        const query = createQueryString(searchParams, "name", name);

        return (
          <React.Fragment key={name}>
            {index !== 0 && <Divider />}
            <Link href={`/star-wars-heroes/${heroesId}?` + query}>
              <Flex
                p={2}
                align="center"
                justify="center"
                _hover={{ fontWeight: "semibold" }}
              >
                <Text data-testid="hero-name">{name}</Text>
              </Flex>
            </Link>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default HeroesList;
