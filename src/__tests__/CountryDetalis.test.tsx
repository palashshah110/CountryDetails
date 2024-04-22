import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CountryDetalis from "../Component/CountryDetalis.tsx";
import { MemoryRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
const mockState = {
  state: {
    capital: ["new delhi"],
    flags: { png: "url1", svg: "url2", alt: "urlinfo" },
    latlng: [77, 20],
    population: 8989,
  },
};

describe("rendering Country Detalis page", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  test("Displaying all the state data", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/getCountryDetalis", state: mockState.state },
        ]}
      >
        <CountryDetalis />
      </MemoryRouter>
    );

    const backButton = screen.getByText("Go Back");
    const CapitalText = screen.getByText("Capital: new delhi");
    const PopulationText = screen.getByText("Population: 8989");
    const LatitudeText = screen.getByTitle("lat");
    const LongitudeText = screen.getByTitle("lon");
    expect(backButton).toBeInTheDocument();
    expect(CapitalText).toBeInTheDocument();
    expect(PopulationText).toBeInTheDocument();
    expect(LatitudeText.innerHTML).toBe("Latitude: 77");
    expect(LongitudeText.innerHTML).toBe("Longitude: 20");
  });

  test("Checking Go Back button", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/getCountryDetalis", state: mockState.state },
        ]}
      >
        <CountryDetalis />
      </MemoryRouter>
    );

    const GoBackButton = screen.getByText("Go Back");
    fireEvent.click(GoBackButton);
    expect(window.location.pathname).toBe("/");
  });

  test("Checking Api for Capital Weather button", async () => {
     render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/getCountryDetails", state: mockState.state },
        ]}
      >
        <CountryDetalis navigate={() => {}} />
      </MemoryRouter>
    );
    fetchMock.mockResponseOnce(
      JSON.stringify({
        main: {
          temp: 20,
        },
        wind: {
          speed: 20,
        },
      })
    );

    const CapitalWeatherButton = screen.getByText("Capital Weather");
    fireEvent.click(CapitalWeatherButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.openweathermap.org/data/2.5/weather?lat=77&lon=20&appid=a80e7dc04639cfc4193d55970d07c503"
      );
    });
  
    expect(screen.getByText("Temperature: 0")).toBeInTheDocument();
    expect(screen.getByText("Wind Speed: 0")).toBeInTheDocument();

    const CloseCapitalWeatherButton = screen.getByText("Close Capital Weather");
    fireEvent.click(CloseCapitalWeatherButton);
  });

  test("Checking Api for Capital Weather button - error case", async () => {
    fetchMock.mockRejectOnce(new Error("API is down"));

    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/getCountryDetalis", state: mockState.state },
        ]}
      >
        <CountryDetalis navigate={() => {}} />
      </MemoryRouter>
    );

    const CapitalWeatherButton = screen.getByText("Capital Weather");
    fireEvent.click(CapitalWeatherButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.openweathermap.org/data/2.5/weather?lat=77&lon=20&appid=a80e7dc04639cfc4193d55970d07c503"
      );
    });
  });

});
