import {
  heroeInfoWithNoStarshipsMock,
  starshipsMock,
} from "@/app/components/flowGraph/__mocks__/flowGraphMock";
import {
  addStarshipsToFilms,
  fetchStarshipsRecursively,
  getIdsAsString,
} from "../utils";
import axios from "axios";
import { ErrorsEnum } from "@/app/enums/ErrorsEnum";
import {
  starshipsFromServerPage1Mock,
  starshipsFromServerPage2Mock,
} from "../__mock__/starWarsHeroeMock";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

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

describe("getIdsAsString function", () => {
  it("returns a list of starships on successful fetch", async () => {
    mockedAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve(starshipsFromServerPage1Mock)
      )
      .mockImplementationOnce(() =>
        Promise.resolve(starshipsFromServerPage2Mock)
      );

    const setError = jest.fn();

    const result = await fetchStarshipsRecursively(
      "http://example.com/api/starships/?films__in=1",
      setError
    );

    expect(result).toEqual([{ name: "Starship 1" }, { name: "Starship 2" }]);
    expect(setError).not.toHaveBeenCalled();
  });

  it("sets an error and returns an empty array on fetch failure", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    const setError = jest.fn();

    const result = await fetchStarshipsRecursively(
      "http://example.com/api/starships/?films__in=1",
      setError
    );

    expect(result).toEqual([]);
    expect(setError).toHaveBeenCalledWith({
      name: ErrorsEnum.LoadName,
      message: ErrorsEnum.LoadMessage,
    });
  });
});
