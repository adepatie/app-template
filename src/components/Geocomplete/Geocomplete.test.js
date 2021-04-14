import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Geocomplete from "./Geocomplete";
import { mockApiData } from "./test-data";

test("Geocomplete initializes google maps api", async () => {
  render();

  await waitFor(() => screen.getByRole("WeatherChart"));
  await waitFor(() => screen.getByRole("CurrentTemp"));
  await waitFor(() =>
    expect(
      screen.getByText(Math.floor(mockApiData.hourly[4].temp))
    ).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(
      screen.getByText(Math.floor(mockApiData.current.temp))
    ).toBeInTheDocument()
  );
});
