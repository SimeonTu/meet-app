import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {


    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('user hasn’t searched for any city', () => {

        });

        when('the user opens the app', () => {
            render(<App />);
            
        });

        then('the user should see the list of all upcoming events.', async () => {

            let allEvents = await getEvents();
            await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

            // const EventList = await screen.findByTestId("event-list")
            const eventListItems = within(await screen.findByTestId("event-list")).queryAllByRole("listitem")
            expect(eventListItems.length).toBe(32)
        });
    });

    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {

        let citySearch

        given('the main page is open', async () => {
            render(<App />)
            let allEvents = await getEvents();
            await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything
        });

        when('user starts typing in the city textbox', async () => {

            const user = userEvent.setup();
            // render(<App />)
            citySearch = screen.getAllByTestId("city-search")[0]
            const cityTextBox = within(citySearch).queryByRole("textbox");
            // const citySearchInput = screen.getAllByRole("textbox") //found more than 1 textboxes (??)

            await user.type(cityTextBox, "Berlin");

        });

        then('the user should recieve a list of cities (suggestions) that match what they’ve typed', () => {

            const citySearchList = within(citySearch).queryAllByRole("listitem")
            expect(citySearchList).toHaveLength(2)

        });
    });

    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {

        let citySearchElement;
        let citySearchInput;
        let citySearchList;

        given('user was typing “Berlin” in the city textbox', async () => {

            const user = userEvent.setup();
            render(<App />)

            let allEvents = await getEvents();
            await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

            citySearchElement = screen.getByTestId("city-search")
            citySearchInput = within(citySearchElement).queryByRole("textbox") //found more than 1 textboxes (??)

            await user.type(citySearchInput, "Berlin")
            //
        });

        and('the list of suggested cities is showing', () => {

            citySearchList = within(citySearchElement).queryAllByRole("listitem")
            expect(citySearchList).toHaveLength(2);

        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {

            const user = userEvent.setup()
            await user.click(citySearchList[0])

        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {

            expect(citySearchInput.value).toBe('Berlin, Germany');

        });

        and('the user should receive a list of upcoming events in that city', async () => {

            const EventList = screen.getByTestId('event-list');
            const EventListItems = within(EventList).queryAllByRole('listitem');
            const allEvents = await getEvents();

            // filtering the list of all events down to events located in Germany
            // citySearchInput.value should have the value "Berlin, Germany" at this point
            const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
            expect(EventListItems).toHaveLength(berlinEvents.length);

        });
    });

});