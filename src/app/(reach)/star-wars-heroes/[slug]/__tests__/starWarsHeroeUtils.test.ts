import {
  heroeInfoWithNoStarshipsMock,
  starshipsMock,
} from "@/app/components/flowGraph/__mocks__/flowGraphMock";
import { addStarshipsToFilms, getIdsAsString } from "../utils";

describe("addStarshipsToFilms function", () => {
  it("should add starships to each film correctly", () => {
    const result = addStarshipsToFilms(
      starshipsMock,
      heroeInfoWithNoStarshipsMock
    );

    // Check if starships are added correctly to films
    expect(result[0].starships).toEqual([
      {
        id: "5",
        name: "Sentinel-class landing craft",
      },
      {
        id: "6",
        name: "TIE/LN starfighter",
      },
    ]);

    expect(result[1].starships).toEqual([
      {
        id: "5",
        name: "Sentinel-class landing craft",
      },
    ]);
  });
});

describe("getIdsAsString function", () => {
  it("should return comma-separated ids", () => {
    const array = [{ id: "1" }, { id: "2" }, { id: "3" }];

    const result = getIdsAsString(array);

    expect(result).toEqual("1,2,3");
  });

  it("should handle empty array", () => {
    const array: { id: string }[] = [];

    const result = getIdsAsString(array);

    expect(result).toEqual("");
  });

  it("should handle array with single element", () => {
    const array = [{ id: "1" }];

    const result = getIdsAsString(array);

    expect(result).toEqual("1");
  });
});
