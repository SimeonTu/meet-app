// src/__tests__/NumberOfEvents.test.js

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

describe("<NumberOfEvents /> component", () => {
  test("contains input field", () => {
    render(<NumberOfEvents />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("default input field value is 32", () => {
    render(<NumberOfEvents />);
    expect(screen.getByRole("textbox")).toHaveValue("32");
  });

  test("render NumberOfEvents", async () => {
    const user = userEvent.setup();
    render(<NumberOfEvents setNumberOfEvents={() => { }} />);

    let textbox = screen.getByRole("textbox");

    await user.type(textbox, "{backspace}{backspace}10");

    expect(screen.getByRole("textbox")).toHaveValue("10");
  });
});

describe("<NumberOfEvents /> integration", () => {

  test("ensure the number of events resets to 32 after input field is cleared.", async () => {

    const user = userEvent.setup()
    render(<App />);

    let numberOfEventsInput = within(screen.getByTestId("number-of-events")).queryByRole("textbox")
    await user.type(numberOfEventsInput, "{backspace}{backspace}");

    const EventList = await screen.findByTestId("event-list");
    const allRenderedEventItems = within(EventList).queryAllByRole("listitem");

    expect(allRenderedEventItems.length).toBe(32)

  })

  test("ensure the number of events rendered matches the number of events inputted by the user.", async () => {

    const user = userEvent.setup()
    render(<App />);

    let numberOfEventsInput = within(screen.getByTestId("number-of-events")).queryByRole("textbox")
    await user.type(numberOfEventsInput, "{backspace}{backspace}10");

    const EventList = await screen.findByTestId("event-list");
    const allRenderedEventItems = within(EventList).queryAllByRole("listitem");

    expect(allRenderedEventItems.length).toBe(10)

  })

});
