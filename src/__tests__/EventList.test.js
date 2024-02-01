import { screen, render } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";

describe("<EventList /> component", () => {
  test("has an element with 'list' role", async () => {
    render(<EventList />);
    expect(await screen.findByRole("list")).toBeInTheDocument();
  });

  test("renders correct number of events", async () => {
    const allEvents = await getEvents();
    render(<EventList events={allEvents} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});
