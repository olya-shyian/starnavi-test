import {
  Pagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
} from "@ajna/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

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
}: PaginationComponentProps) => (
  <Pagination
    pagesCount={pagesCount}
    currentPage={currentPage}
    onPageChange={setCurrentPage}
  >
    <PaginationContainer>
      <PaginationPrevious colorScheme="teal" mr={"2"}>
        <ChevronLeftIcon boxSize={5} />
      </PaginationPrevious>

      <PaginationPageGroup>
        {pages.map((page) => (
          <PaginationPage
            w={7}
            mr={"1"}
            fontSize="sm"
            width={"7"}
            key={`pagination_page_${page}`}
            page={page}
            _current={{
              bg: "gray.400",
            }}
          />
        ))}
      </PaginationPageGroup>

      <PaginationNext colorScheme="teal">
        <ChevronRightIcon boxSize={5} />
      </PaginationNext>
    </PaginationContainer>
  </Pagination>
);

export default PaginationComponent;
