Feature: Specify Number of Events

    Scenario: The app should display 32 events by default when opened
        Given the user opens the app and has not specified the number of events
        When the user views the upcoming events
        Then the app should display 32 events by default

    Scenario: The app should update the number of events based on the user adjusting the (Number of events) slider
        Given the user has opened the app and the event list is visible
        When the user specifies a different number of events to be displayed using the provided slider
        Then the app should update and show the specified number of events