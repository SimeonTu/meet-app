// src/__tests__/App.test.js

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

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

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    render(<App />);

    let allEvents = await getEvents();
    await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

    const CitySearch = screen.getByTestId("city-search");
    const CitySearchInput = within(CitySearch).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearch).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    const EventList = await screen.findByTestId("event-list");
    const allRenderedEventItems = await within(EventList).findAllByRole("listitem");

    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
});
