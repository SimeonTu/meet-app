// src/__tests__/App.test.js

import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  test("renders list of events", async () => {
    render(<App />);
    expect(await screen.findByTestId("event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    render(<App />);
    expect(screen.getByTestId("city-search")).toBeInTheDocument();
  });

  test("render NumberOfEvents", () => {
    render(<App />);
    expect(screen.getByTestId("number-of-events")).toBeInTheDocument();
  });
});
