// src/__tests__/NumberOfEvents.test.js

import { render, screen, within, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

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
    render(<NumberOfEvents setNumberOfEvents={() => { }} />);

    let slider = screen.getByRole("slider")

    fireEvent.change(slider, { target: { value: 10 } });

    expect(screen.getByRole("slider")).toHaveValue("10");
  });
});

describe("<NumberOfEvents /> integration", () => {

  test("ensure the number of events rendered matches the number of events inputted by the user.", async () => {

    render(<App />);

    let slider = screen.getByRole("slider")

    fireEvent.change(slider, { target: { value: 10 } });

    const EventList = await screen.findByTestId("event-list");
    const allRenderedEventItems = within(EventList).queryAllByRole("listitem");

    expect(allRenderedEventItems.length).toBe(10)

  })

});
