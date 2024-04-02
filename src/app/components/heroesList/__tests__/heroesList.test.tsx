import { render } from "@testing-library/react";
import HeroesList from "../HeroesList";
import { HeroesMock } from "../__mocks__/heroesMock";
import { createQueryString } from "@/app/utils/generalUtils";

// Mock useSearchParams
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => new URLSearchParams("")),
}));

// Mock createQueryString
jest.mock("@/app/utils/generalUtils", () => ({
  createQueryString: jest.fn(() => "name=Luke Skywalker"),
  getIdFromUrl: jest.fn(() => "1"),
}));

describe("HeroesList component", () => {
  it("renders a list of heroes", () => {
    const { asFragment } = render(<HeroesList people={HeroesMock} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("creates correct query string for each hero", () => {
    render(<HeroesList people={HeroesMock} />);

    HeroesMock.forEach((hero) => {
      expect(createQueryString).toHaveBeenCalledWith(
        expect.any(URLSearchParams),
        "name",
        hero.name
      );
    });
  });
});
