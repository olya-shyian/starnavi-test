import { NEXT_GROUP, PAGINATION_STEP, PREVIOUS_GROUP } from "../consts";
import { calculateTargetPageForDots } from "../utils";

describe("calculateTargetPageForDots", () => {
  it("should calculate the target page for the next group correctly", () => {
    const currentPage = 1;
    const expectedTargetPage = currentPage + PAGINATION_STEP;
    const result = calculateTargetPageForDots(NEXT_GROUP, currentPage);
    expect(result).toEqual(expectedTargetPage);
  });

  it("should calculate the target page for the previous group correctly", () => {
    const currentPage = 10;
    const expectedTargetPage = currentPage - PAGINATION_STEP;
    const result = calculateTargetPageForDots(PREVIOUS_GROUP, currentPage);
    expect(result).toEqual(expectedTargetPage);
  });

  it("should return the same page if the input is neither NEXT_GROUP nor PREVIOUS_GROUP", () => {
    const currentPage = 5;
    const arbitraryPage = 7; // A value that is neither NEXT_GROUP nor PREVIOUS_GROUP
    const result = calculateTargetPageForDots(arbitraryPage, currentPage);
    expect(result).toEqual(arbitraryPage);
  });
});
