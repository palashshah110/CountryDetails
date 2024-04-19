import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import CountryForm from "../Component/CountryForm";
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";

fetchMock.enableMocks();

describe("Country Form Component", () => {
  test("Checking and test Country Api", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CountryForm navigate={() => {}} />
      </MemoryRouter>
    );
    const mockState = {
      state: {
        capital: ["new delhi"],
        flags: { png: "url1", svg: "url2", alt: "urlinfo" },
        latlng: [77, 20],
        population: 8989,
      },
    };

    fetchMock.mockResolvedValue({
      status: 200,
      json: jest.fn(() => mockState),
    });

    const CountryInput = screen.getByPlaceholderText("Enter Country");
    fireEvent.change(CountryInput, { target: { value: "india" } });

    expect(CountryInput.value).toBe("india");
    const SearchButton = screen.getByText("Search Country");

    fireEvent.click(SearchButton);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/name/india?fullText=true"
    );
  });

  test("checking API fail", async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("API error"));
    render(
      <BrowserRouter>
        <CountryForm navigate={() => {}} />
      </BrowserRouter>
    );

    const CountryInput = screen.getByPlaceholderText("Enter Country");
    act(() => {
      fireEvent.change(CountryInput, { target: { value: "Uni ted Kingdom" } });
    });

    expect(CountryInput.value).toBe("");

    act(() => {
      fireEvent.change(CountryInput, { target: { value: "hello" } });
      const SearchButton = screen.getByText("Search Country");
      fireEvent.click(SearchButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Not Found: hello")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/name/hello?fullText=true"
    );

    expect(window.location.pathname).toBe("/");
  });

  it("should clear errorMessage after 2 seconds", async () => {
    jest.useFakeTimers();

    render(
      <BrowserRouter>
        <CountryForm navigate={() => {}} />
      </BrowserRouter>
    );
    const CountryInput = screen.getByPlaceholderText("Enter Country");

    act(() => {
      fireEvent.change(CountryInput, { target: { value: "hello" } });
      const SearchButton = screen.getByText("Search Country");
      fireEvent.click(SearchButton);
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    jest.useRealTimers();
  });
});
