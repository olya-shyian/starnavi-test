import { createQueryString } from "@/app/utils/generalUtils";
import {
  Pagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
} from "@ajna/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { calculateTargetPageForDots } from "./utils";

interface PaginationComponentProps {
  pages: number[];
  pagesCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationComponent = ({
  pages,
  pagesCount,
  currentPage,
  setCurrentPage,
}: PaginationComponentProps) => {
  const searchParams = useSearchParams();

  const paginationPreviousQuery = createQueryString(
    searchParams,
    "page",
    `${currentPage - 1}`
  );
  const paginationNextQuery = createQueryString(
    searchParams,
    "page",
    `${currentPage + 1}`
  );

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      <PaginationContainer>
        <Link href={`?` + paginationPreviousQuery} shallow>
          <PaginationPrevious colorScheme="teal" mr={"2"}>
            <ChevronLeftIcon boxSize={5} />
          </PaginationPrevious>
        </Link>

        <PaginationPageGroup>
          {pages.map((page) => {
            const query = createQueryString(
              searchParams,
              "page",
              `${calculateTargetPageForDots(page, currentPage)}`
            );

            return (
              <Link href={`?` + query} key={`pagination_page_${page}`} shallow>
                <PaginationPage
                  w={7}
                  mr={"1"}
                  fontSize="sm"
                  page={page}
                  _current={{
                    bg: "gray.400",
                  }}
                />
              </Link>
            );
          })}
        </PaginationPageGroup>

        <Link href={`?` + paginationNextQuery} shallow>
          <PaginationNext colorScheme="teal">
            <ChevronRightIcon boxSize={5} />
          </PaginationNext>
        </Link>
      </PaginationContainer>
    </Pagination>
  );
};

export default PaginationComponent;
