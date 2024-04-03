import { NEXT_GROUP, PAGINATION_STEP, PREVIOUS_GROUP } from "./consts";

export const calculateTargetPageForDots = (
  page: number,
  currentPage: number
) => {
  let targetPage = page;

  if (page === NEXT_GROUP) {
    targetPage = currentPage + PAGINATION_STEP;
  } else if (page === PREVIOUS_GROUP) {
    targetPage = currentPage - PAGINATION_STEP;
  }

  return targetPage;
};
