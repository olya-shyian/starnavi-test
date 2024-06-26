"use client";

import React, { useEffect, useState } from "react";
import { Center, Container, Heading } from "@chakra-ui/react";
import { usePagination } from "@ajna/pagination";
import HeroesList from "./components/heroesList/HeroesList";
import PaginationComponent from "./components/pagination/PaginationComponent";
import axios from "axios";
import { IHeroe } from "./interfaces/IHeroe";
import useErrorHandler from "./hooks/useErrorHandler";
import { ErrorsEnum } from "./enums/ErrorsEnum";
import {
  CURRENT_PAGE,
  INITIAL_TOTAL_ITEMS,
  INNER_LIMIT,
  ITEMS_PER_PAGE,
  OUTER_LIMIT,
} from "./components/pagination/consts";
import { useSearchParams } from "next/navigation";

interface PaginationDataState {
  totalItems: number;
  itemsPerPage: number;
}

const App = () => {
  const [heroes, setHeroes] = useState<IHeroe[]>([]);
  const { setError, renderError } = useErrorHandler();

  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const [paginationData, setPaginationData] = useState<PaginationDataState>({
    totalItems: INITIAL_TOTAL_ITEMS,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    total: paginationData.totalItems,
    initialState: {
      currentPage: page ? +page : CURRENT_PAGE,
      pageSize: paginationData.itemsPerPage,
    },
    limits: {
      outer: OUTER_LIMIT,
      inner: INNER_LIMIT,
    },
  });

  useEffect(() => {
    const getHeroes = async (selectedPage: number) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/people?page=${selectedPage}`
        );

        const { results, count } = response.data;

        setHeroes(results);

        setPaginationData({
          totalItems: count,
          itemsPerPage: results.length,
        });
      } catch (error) {
        setError({
          name: ErrorsEnum.LoadName,
          message: ErrorsEnum.LoadMessage,
        });
      }
    };

    getHeroes(currentPage);
  }, [currentPage, setError]);

  return (
    <main>
      {renderError()}

      {!!heroes.length && (
        <Container my={"10"}>
          <Heading as="h2" size="4xl" textAlign="center">
            Star Wars
          </Heading>

          <HeroesList people={heroes} />

          <Center>
            <PaginationComponent
              pages={pages}
              pagesCount={pagesCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Center>
        </Container>
      )}
    </main>
  );
};

export default App;
