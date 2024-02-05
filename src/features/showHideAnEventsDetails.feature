Feature: Show/Hide Event Details
    Scenario: When a user opens the app, the event details should be hidden by default
        Given the user opens the app
        When the list of events is visible
        Then the event details should be initially collapsed

    Scenario: User should be able to see an event's details after clicking the event's "Show Details" button
        Given the list of events is visible
        When the user clicks an event's Show Details button
        Then the app should expand the details of the chosen event

    Scenario: User should be able to hide an event's details after clicking the event's "Hide Details" button after initially expanding it
        Given the user is viewing an expanded event
        When the user clicks an event's Hide Details button
        Then the app should hide the details of the collapsed event