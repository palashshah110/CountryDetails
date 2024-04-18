import React from "react";
import { render, screen } from "@testing-library/react";
import CountryDetalis from "../Component/CountryDetalis.tsx";
import { MemoryRouter } from "react-router-dom";

const mockState = {
  state: {
    capital: ["new delhi"],
    flags: { png: "url1", svg: "url2", alt: "urlinfo" },
    latlng: [77, 20],
    population: 8989,
  },
};

describe("rendering Country Detalis page", () => {
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
  
});
