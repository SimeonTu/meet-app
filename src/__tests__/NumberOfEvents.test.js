// src/__tests__/NumberOfEvents.test.js

import { render, screen, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";
import { getEvents } from "../api";

describe("<NumberOfEvents /> component", () => {
  test("contains input field", () => {
    render(<NumberOfEvents />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  test("default input field value is 32", () => {
    render(<NumberOfEvents />);
    expect(screen.getByRole("slider")).toHaveValue("32");
  });

  test("change input of NumberOfEvents", async () => {
    render(<App />);
    await screen.findByTestId("event-list")

    let slider = screen.getByRole("slider")

    fireEvent.change(slider, { target: { value: 10 } });

    expect(screen.getByRole("slider")).toHaveValue("10");
  });
});

describe("<NumberOfEvents /> integration", () => {

  test("ensure the number of events rendered matches the number of events inputted by the user.", async () => {

    render(<App />);
    let allEvents = await getEvents();
    await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

    let slider = screen.getByRole("slider")

    fireEvent.change(slider, { target: { value: 10 } });

    const allRenderedEventItems = screen.queryAllByRole("listitem");

    expect(allRenderedEventItems.length).toBe(10)

  })

});
