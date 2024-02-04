import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { useCallback, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [events, setEvents] = useState("");
  const [locations, setLocations] = useState("");
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [filteredEvents, setFilteredEvents] = useState([])

  const fetchEvents = useCallback(async () => {
    console.log("fetching...");
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    setFilteredEvents(currentCity === "See all cities"
      ? allEvents
      : allEvents.filter((event) => {
        return event.location === currentCity;
      }));
    setLocations(allLocations);
    setEvents(filteredEvents);

    console.log(numberOfEvents);
  }, [currentCity, numberOfEvents, `${filteredEvents}`]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="App">
      <h1>~MEET APP~</h1>
      <div
        className="d-flex justify-content-md-center mx-auto mt-3 mb-4"
        id="top-bar"
      >
        <div>
          <span>Search for a city</span>
          <CitySearch
            allLocations={locations}
            setCurrentCity={setCurrentCity}
          />

          <span>Number of events</span>
          <NumberOfEvents setNumberOfEvents={setNumberOfEvents} setEvents={setEvents} filteredEvents={filteredEvents} />
        </div>
      </div>

      {events.length === 0 ? (
        <p>Events list is empty.</p>
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
}

export default App;
