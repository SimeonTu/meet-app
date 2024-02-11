import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { useCallback, useEffect, useState } from "react";
import { ErrorAlert, InfoAlert } from './components/Alert';
// import NProgress from 'nprogress';
// import './page-loader.css'

function App() {
  const [events, setEvents] = useState("");
  const [allEvents, setAllEvents] = useState("")
  const [locations, setLocations] = useState("");
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [filteredEvents, setFilteredEvents] = useState([])
  const [numberOfEvents, setNumberOfEvents] = useState(32)
  const [infoText, setInfoText] = useState("");
  const [errorText, setErrorText] = useState("");

  const setEventValues = useCallback(() => {
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter((calenderEvent) => {
        return calenderEvent.location === currentCity;
      })
    setFilteredEvents(filteredEvents);
    setEvents(filteredEvents.slice(0, numberOfEvents));
  }, [allEvents, currentCity, numberOfEvents])

  const fetchEvents = useCallback(async () => {

    // console.log("fetching...");
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    // setEvents(allEvents.slice(0, numberOfEvents))
    setAllEvents(allEvents)
    setLocations(allLocations)

    setEventValues();

  }, [setEventValues]);


  useEffect(() => {

    console.log("online:",navigator.onLine);

    if (!events) {
      fetchEvents();
    }
    if (events) {
      setEventValues();
    }

    // console.log("number of events value:", numberOfEvents, "\nevents object length:", events.length);
    // console.log("infotext value:",infoText);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchEvents, numberOfEvents, currentCity, `${events}`, `${allEvents}`, infoText, setEventValues]);


  return (
    <div className="App">
      <h1 style={{ fontFamily: "'Kanit', sans-serif" }} className="mt-3">MEET APP</h1>

      <div>{!navigator.onLine ? "You're offline." : null}</div>

      <div className="alerts-container">
        {errorText ? <ErrorAlert text={errorText} /> : infoText ? <InfoAlert text={infoText} /> : null}
      </div>

      <div
        className="mx-auto mt-3 mb-4"
        id="top-bar"
      >
        <div id="city-search__wrapper" className="me-md-3 mb-2 mb-md-0">
          <span>Search for a city</span>
          <CitySearch
            events={events}
            allLocations={locations}
            setCurrentCity={setCurrentCity}
            setInfoText={setInfoText}
            setErrorText={setErrorText}
          />
        </div>

        <div id="number-of-events__wrapper">
          <span>Number of events</span>
          <NumberOfEvents
            setEvents={setEvents}
            filteredEvents={filteredEvents}
            setNumberOfEvents={setNumberOfEvents} />
        </div>
      </div>

      {
        events.length === 0 ? (
          <p>Events list is empty.</p>
        ) : (
          <EventList events={events} />
        )
      }
    </div >
  );
}

export default App;
