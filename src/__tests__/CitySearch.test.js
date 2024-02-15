import { screen, render, within } from "@testing-library/react";
import CitySearch from "../components/CitySearch";
import userEvent from "@testing-library/user-event";
import { extractLocations, getEvents } from "../api";
import App from "../App";

describe("<CitySearch /> component", () => {
  test("renders text input", () => {
    render(<CitySearch allLocations={[]} />);
    const cityTextBox = screen.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    render(<CitySearch allLocations={[]} />);
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    render(<App />);
    const user = userEvent.setup();

    let allEvents = await getEvents();
    await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

    const cityTextBox = screen.queryByRole("textbox");
    await user.click(cityTextBox);
    const suggestionList = screen.queryByTestId("suggestions-container");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");

  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    render(<App />);

    let allEvents = await getEvents();
    await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything
    const allLocations = extractLocations(allEvents);


    // user types "Berlin" in city textbox
    const citySearch = screen.getByTestId("city-search")
    const cityTextBox = screen.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
        return (
          location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
        );
      })
      : [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = within(citySearch).queryAllByRole("listitem");
    // console.log(suggestionListItems);
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(
      <CitySearch events={{}}
        allLocations={[]}
        setCurrentCity={() => { }}
        setInfoText={() => { }}
        setErrorText={() => { }}
        userCountry={""}
        userCountryFormatted={[]}
        searchForUserCountry={""}
        setSearchForUserCountry={() => { }} />
    );

    const cityTextBox = screen.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = screen.queryAllByRole("listitem")[0];
    // console.log(BerlinGermanySuggestion);

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

  test("suggestion box should show all available cities after user leaves field empty (i.e. typing something and then deleting it)", async () => {

    const user = userEvent.setup();
    render(<App />)

    let allEvents = await getEvents();
    await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

    const CitySearch = screen.getByTestId("city-search");
    const cityTextBox = within(CitySearch).queryByRole("textbox");
    // console.log(cityTextBox);

    await user.type(cityTextBox, "test{backspace}{backspace}{backspace}{backspace}");

    const allLocations = extractLocations(allEvents);

    const suggestionListItems = within(CitySearch).queryAllByRole("listitem");
    // console.log(suggestionListItems);
    expect(suggestionListItems.length).toBe(allLocations.length + 1);

  })
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered.", async () => {
    const user = userEvent.setup();
    render(<App />);

    const CitySearch = screen.getByTestId("city-search");
    const cityTextBox = within(CitySearch).queryByRole("textbox");
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = within(CitySearch).queryAllByRole("listitem");
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});
