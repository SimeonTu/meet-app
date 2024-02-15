import { loadFeature, defineFeature } from 'jest-cucumber';
import App from "../App";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('The app should display 32 events by default when opened', ({ given, when, then }) => {

        let EventList;

        given('the user opens the app and has not specified the number of events', async () => {

            render(<App />)

            let allEvents = await getEvents();
            await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

            expect(screen.getByRole("slider")).toHaveValue("32");

        });

        when('the user views the upcoming events', async () => {

            EventList = await screen.findByTestId("event-list")

        });

        then("the app should display 32 events by default", () => {

            const allRenderedEventItems = within(EventList).getAllByRole("listitem");
            expect(allRenderedEventItems.length).toBe(32)

        });
    });

    test('The app should update the number of events based on the user adjusting the (Number of events) slider', ({ given, when, then }) => {
        given('the user has opened the app and the event list is visible', async () => {

            render(<App />)
            await screen.findByTestId("event-list")

        });

        when('the user specifies a different number of events to be displayed using the provided slider', () => {

            let slider = screen.getByRole("slider")
            fireEvent.change(slider, { target: { value: 10 } });

        });

        then('the app should update and show the specified number of events', () => {

            expect(screen.getByRole("slider")).toHaveValue("10");

        });
    });

});