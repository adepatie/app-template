import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { QueryClient, QueryClientProvider } from "react-query";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Dashboard from "./Dashboard";
import { mockApiData } from "../WeatherChart/test-data";

const server = setupServer(
  rest.get(
    "https://api.openweathermap.org/data/2.5/onecall",
    (req, res, ctx) => {
      return res(ctx.json(mockApiData));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

const DashboardTestWrapper = (props) => (
  <QueryClientProvider {...props} client={queryClient} />
);
test("loads and displays location modal", async () => {
  render(
    <DashboardTestWrapper>
      <Dashboard />
    </DashboardTestWrapper>
  );

  await waitFor(() => screen.getByRole("TextField"));

  expect(screen.getByRole("TextField")).toBeInTheDocument();
  expect(screen.getByRole("ModalWindow")).toBeInTheDocument();
  expect(screen.getByRole("ModalBackground")).toBeInTheDocument();
  expect(screen.getByRole("TextField")).toHaveValue("");
});

// Using the timer to get around google maps autocomplete
jest.setTimeout(10000);
test("Modal closes after location is set (5sec timer)", async () => {
  render(
    <DashboardTestWrapper>
      <Dashboard />
    </DashboardTestWrapper>
  );

  await waitFor(() => screen.getByRole("ModalBackground"));
  await waitFor(
    () =>
      expect(screen.getByRole("ModalBackground")).toHaveStyle(
        "background: rgba(0, 0, 0, 0)"
      ),
    {
      timeout: 6000,
    }
  );

  expect(screen.getByRole("ModalBackground")).toHaveStyle(
    "background: rgba(0, 0, 0, 0)"
  );
  expect(screen.getByRole("ModalWindow")).toHaveStyle(
    "background: rgba(255, 255, 255, 0)"
  );
});
