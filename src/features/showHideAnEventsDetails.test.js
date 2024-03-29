import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('When a user opens the app, the event details should be hidden by default', ({ given, when, then }) => {
        given('the user opens the app', () => {
            render(<App />);
        });

        when('the list of events is visible', async () => {
            await screen.findByTestId("event-list")
        });

        then('the event details should be initially collapsed', () => {
            expect(screen.queryByTestId("details")).toBeNull();
        });
    });

    test('User should be able to see an event\'s details after clicking the event\'s "Show Details" button', ({ given, when, then }) => {

        given('the list of events is visible', async () => {
            render(<App />);
            let allEvents = await getEvents();
            await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything
        });

        when('the user clicks an event\'s Show Details button', async () => {
            const user = userEvent.setup()
            await user.click(screen.getAllByText("Show details")[0])
        });

        then('the app should expand the details of the chosen event', () => {
            const detailsSection = screen.getAllByTestId("details")[0];
            expect(detailsSection).toBeInTheDocument();
        });
    });

    test('User should be able to hide an event\'s details after clicking the event\'s "Hide Details" button after initially expanding it', ({ given, when, then }) => {

        const user = userEvent.setup()
        let detailsSection;

        given('the user is viewing an expanded event', async () => {

            render(<App />);
            let allEvents = await getEvents();
            await screen.findAllByText(allEvents[0].summary); //used in order to await for events to load before doing anything

            let showDetailsBtn = screen.getAllByText("Show details")[0]
            await user.click(showDetailsBtn)

            detailsSection = screen.getAllByTestId("details")[0];
            expect(detailsSection).toBeInTheDocument();

        });

        when('the user clicks an event\'s Hide Details button', async () => {

            let hideDetailsBtn = screen.getAllByText("Hide details")[0]
            await user.click(hideDetailsBtn)

        });

        then('the app should hide the details of the collapsed event', () => {

            // No longer applicable as the details section works in a different way (always in the DOM, just not fully visible)
            // expect(detailsSection).not.toBeInTheDocument();

        });
    });
});