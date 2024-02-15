import { screen, render, within, waitFor } from "@testing-library/react";
import App from "../App";
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

describe("<EventList /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    render(<App />);

    let allEvents = await getEvents();
    await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything
    
    // expect(within(await screen.findByTestId("event-list")).queryAllByRole("listitem").length).toBe(32)

    // await waitFor(() => {
    const EventList = await screen.findByTestId("event-list");
    const EventListItems = within(EventList).queryAllByRole("listitem");
    expect(EventListItems.length).toBe(32);
    // });
  });
});
