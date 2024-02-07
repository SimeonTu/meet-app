import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { useCallback, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [events, setEvents] = useState("");
  const [allEvents, setAllEvents] = useState("")
  const [locations, setLocations] = useState("");
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [filteredEvents, setFilteredEvents] = useState([])
  const [numberOfEvents, setNumberOfEvents] = useState(32)

  const fetchEvents = useCallback(async () => {

    // console.log("fetching...");
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    setEvents(allEvents)
    setAllEvents(allEvents)
    setLocations(allLocations)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [`${events}`]);

  useEffect(() => {

    if (!events) {
      fetchEvents();
    }

    if (events) {

      const filteredEvents = currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((calenderEvent) => {
          return calenderEvent.location === currentCity;
        })
      setFilteredEvents(filteredEvents);
      setEvents(filteredEvents.slice(0, numberOfEvents));

    }

    console.log("number of events value:", numberOfEvents, "\nevents object length:", events.length);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchEvents, numberOfEvents, currentCity, `${events}`]);

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
          <NumberOfEvents setEvents={setEvents} filteredEvents={filteredEvents} setNumberOfEvents={setNumberOfEvents} />
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
