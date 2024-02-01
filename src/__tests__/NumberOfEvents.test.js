// src/__tests__/NumberOfEvents.test.js

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

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
    render(<NumberOfEvents />);

    let textbox = screen.getByRole("textbox");

    await user.type(textbox, "{backspace}{backspace}10");

    expect(screen.getByRole("textbox")).toHaveValue("10");
  });
});
