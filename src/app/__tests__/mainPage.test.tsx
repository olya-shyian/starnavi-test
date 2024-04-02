import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "../page";
import { HeroesMock } from "../components/heroesList/__mocks__/heroesMock";

const mockAxios = new MockAdapter(axios);

jest.mock("next/link", () => {
  const NextLink = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  NextLink.displayName = "NextLink";

  return NextLink;
});

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => new URLSearchParams("")),
}));

describe("App Component", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it("renders list of hero names on successful API call", async () => {
    // Mock the API call
    mockAxios.onGet("https://sw-api.starnavi.io/people?page=1").reply(200, {
      results: HeroesMock,
      count: HeroesMock.length,
    });

    render(<App />);

    // Wait for the API call to complete and the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify the snapshot
    expect(screen.getByRole("main")).toMatchSnapshot();
  });
});
