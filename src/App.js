import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [events, setEvents] = useState("");
  const [locations, setLocations] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      setEvents(allEvents);
      setLocations(allLocations);
      // console.log(events);
    }

    fetchEvents();
    // console.log(events);
  }, [events]);

  return (
    <div className="App">
      <div
        className="d-flex justify-content-md-center mx-auto mt-3 mb-4"
        id="top-bar"
      >
        <div>
          <span>Search for a city</span>
          <CitySearch allLocations={locations} />
        </div>
        <div>
          <span>Number of events</span>
          <NumberOfEvents />
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
