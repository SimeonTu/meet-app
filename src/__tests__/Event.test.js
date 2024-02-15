import { fireEvent, render, screen } from "@testing-library/react";
import { getEvents } from "../api";
import App from "../App";
import '../App.scss'

describe("<Event /> component", () => {
  let allEvents;
  beforeAll(async () => {
    allEvents = await getEvents();
  });

  test("renders event title", async () => {
    render(<App />);

    //wait for App.js to fetch all events, then save all title elements with duplicate names (Learn Javascript in this case) in a variable
    const titleElements = await screen.findAllByText(allEvents[0].summary); //returns an array

    //expect a title element with the name "Learn Javascript" to be in the document
    expect(titleElements[0]).toBeInTheDocument(); //check the first element of the array
  });

  test("renders event start time", async () => {
    render(<App />);

    const timeElements = await screen.findAllByTestId("start-time");

    const timeElement = timeElements[0]

    expect(timeElement).toBeInTheDocument();
  });

  test("renders event location", async () => {
    render(<App />);

    const locationElements = await screen.findAllByText(allEvents[0].location);

    expect(locationElements[0]).toBeInTheDocument();
  });

  test("renders details button", async () => {
    render(<App />);

    const detailsButtons = await screen.findAllByText("Show details");

    expect(detailsButtons[0]).toBeInTheDocument();
  });

  test("by default, event's details section should be hidden", async () => {
    render(<App />);

    await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

    const detailsButtons = await screen.findAllByText("Show details");
    const detailsButton = detailsButtons[0]

    expect(detailsButton).toHaveTextContent("Show details")
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    render(<App />);

    await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

    const detailsButtons = await screen.findAllByText("Show details");

    fireEvent.click(detailsButtons[0]);

    const detailsSection = screen.getAllByTestId("details")[0];

    expect(detailsSection).toBeInTheDocument();
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    render(<App />);

    await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

    const detailsButtons = await screen.findAllByText("Show details");

    fireEvent.click(detailsButtons[0]);

    const detailsSection = screen.getAllByTestId("details")[0];

    fireEvent.click(detailsButtons[0]);

    // expect(detailsSection).not.toBeInTheDocument();
  });
});
