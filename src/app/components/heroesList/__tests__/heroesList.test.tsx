import { render } from "@testing-library/react";
import HeroesList from "../HeroesList";
import { HeroesMock } from "../__mocks__/heroesMock";
import { createQueryString } from "@/app/utils/generalUtils";

// Mock useSearchParams
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => new URLSearchParams("")),
}));

describe("HeroesList component", () => {
  it("renders a list of heroes", () => {
    const { asFragment } = render(<HeroesList people={HeroesMock} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
