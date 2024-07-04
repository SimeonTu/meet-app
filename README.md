# Meet App - Serverless Progressive Web Application with React

The primary goal of this project is to provide users with a seamless experience in discovering upcoming events in various cities and showcase the ability to build a serverless, progressive web application (PWA) developed using a test-driven development (TDD) technique. 

PWA's features contribute to instant loading, offline support, and cross-platform compatibility and leveraging serverless architecture ensures scalability, availability, and cost-effectiveness. For the app, serverless functions hosted on the cloud provider AWS Lambda are employed to interact with the Google Calendar API and fetch upcoming events.

![Screenshot of the website](https://github.com/SimeonTu/portfolio-website-simeon/blob/main/img/dev-events-fig-1.gif)

[Link to live site](https://simeontu.github.io/meet-app/)

# Technologies used
-	React
-	HTML / JSX
-	CSS / SCSS
-	PWA for offline support and native-like installation
-	AWS Lambda for Google OAuth
-	Google Calendar API / Open AI API
-	Jest-Cucumber / RTL / Puppeteer for testing
-	Recharts 
-	React Bootstrap / NProgress for styling

# Features, user stories and scenarios
## 1. Filter Events by City.

**As an event attendee, I should be able to filter events by city, so that I can easily find and attend events in a specific location without scrolling through irrelevant listings.**
- Scenario 1: <br/>
 Given the user has not searched for a city<br/>
 When the user views the upcoming events<br/>
 Then the app should display events from all cities

- Scenario 2: <br/>
Given the user is on the search page<br/>
When the user starts typing in the city search field<br/>
Then the app should display a list of suggested cities

- Scenario 3: <br/>
Given the user has a list of suggested cities<br/>
When the user selects a city from the list<br/>
Then the app should filter events based on the selected city
<br/>
  
## 2. Show/Hide Event Details.

**As a user, I should be able to show/hide event details, so that I can control the amount of information displayed and focus on the relevant aspects of an event.**
- Scenario 1: <br/>
Given the user is viewing a list of events<br/>
When the user accesses event details<br/>
Then the event details should be initially collapsed

- Scenario 2: <br/>
Given the user is viewing a collapsed event<br/>
When the user chooses to expand the event<br/>
Then the app should display the details of the expanded event

- Scenario 3: <br/>
Given the user is viewing an expanded event<br/>
When the user chooses to collapse the event<br/>
Then the app should hide the details of the collapsed event
<br/>

## 3. Specify Number of Events.
   
**As a user, I should be able to specify the number of events to be displayed, so that I can customize my viewing experience based on my preferences and easily manage the information presented.**
- Scenario 1: <br/>
Given the user has not specified the number of events<br/>
When the user views the upcoming events<br/>
Then the app should display 32 events by default

- Scenario 2: <br/>
Given the user is on the settings page<br/>
When the user specifies a different number of events to be displayed<br/>
Then the app should update and show the specified number of events
<br/>

## 4. Use the App When Offline.

**As a user on the go, I should be able to use the app when offline, so that I can access event information and plan my schedule even in areas with limited or no internet connectivity.**
- Scenario 1: <br/>
Given the user has previously accessed the app with an internet connection
When the user tries to access the app without an internet connection
Then the app should display cached data from the previous session

- Scenario 2: <br/>
Given the user is on the settings page
When the user changes the search settings (city, number of events)
Then the app should show an error message indicating the need for an internet connection to update settings
<br/>

## 5. Display Charts Visualizing Event Details.

**As a user, I should be able to view charts visualizing event details, so that I can gain insights and make informed decisions about which events to attend based on visual representations of relevant data.**
- Scenario 1: <br/>
Given the user is viewing the event visualization page<br/>
When the user accesses the chart displaying the number of upcoming events in each city<br/>
Then the app should show a chart providing a visual representation of event distribution across cities
