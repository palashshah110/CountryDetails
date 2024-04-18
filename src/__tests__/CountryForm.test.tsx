import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CountryForm from "../Component/CountryForm";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("Country Form Component", () => {
  test("Checking and test Country Api", () => {
    render(
      <BrowserRouter>
        <CountryForm navigate={() => {}} />
      </BrowserRouter>
    );

    const CountryInput = screen.getByPlaceholderText("Enter Country");
    fireEvent.change(CountryInput, { target: { value: "india" } });
   
    expect(CountryInput.value).toBe("india");

    const SearchButton = screen.getByText("Search Country");
    fireEvent.click(SearchButton);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/name/india?fullText=true"
    );

    expect(window.location.pathname).toBe('/');
  });
});
