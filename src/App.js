import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { useCallback, useEffect, useState } from "react";
import { ErrorAlert, InfoAlert, LocationAlert, OfflineAlert } from './components/Alert';
// import NProgress from 'nprogress';
// import './page-loader.css'

function App() {
  // const [loading, setLoading] = useState("")

  const [events, setEvents] = useState("");
  const [allEvents, setAllEvents] = useState("")
  const [locations, setLocations] = useState("");
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [filteredEvents, setFilteredEvents] = useState([])
  const [numberOfEvents, setNumberOfEvents] = useState(32)

  const [infoText, setInfoText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [offlineText, setOfflineText] = useState("");
  const [locationAlert, setShowLocationAlert] = useState("");

  const [userCountry, setUserCountry] = useState("");
  const [userCountryFormatted, setUserCountryFormatted] = useState("");
  const [searchForUserCountry, setSearchForUserCountry] = useState("");

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

    if (!userCountry) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (location) {
          console.log("location:", location);
          let latitude = location.coords.latitude.toString()
          let longitude = location.coords.longitude.toString()
          fetch(`https://secure.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=simeont`)
            .then(response => response.json())
            .then(data => {
              let country = data.countryName
              if (country === "United Kingdom") {
                country = "UK"
              }
              console.log(data)
              localStorage.setItem("userCountry", country)

              let filteredLocations = locations.filter(item => item.includes(country))
              console.log("filtered locations", filteredLocations);
              console.log("includes country:", !!filteredLocations);

              setUserCountry(country)
              setUserCountryFormatted(filteredLocations[0])
              setShowLocationAlert(true)
            })
        });
      }
    }

    console.log(userCountry);
    console.log("current city value:", currentCity);

    console.log("online:", navigator.onLine);
    if (navigator.onLine) {
      setOfflineText("")
    } else {
      setOfflineText("You're currently offline and viewing a cached version of the website")
    }

    if (!events) {
      fetchEvents();
    }
    if (events) {
      setEventValues();
      // setLoading(false) could be implemented later
    }

    // console.log("number of events value:", numberOfEvents, "\nevents object length:", events.length);
    // console.log("infotext value:",infoText);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchEvents, numberOfEvents, currentCity, `${events}`, `${allEvents}`, infoText, offlineText, setEventValues, userCountry]);


  return (
    <div className="App">
      <h1 style={{ fontFamily: "'Kanit', sans-serif" }} className="mt-3">MEET APP</h1>

      <div className="alerts-container">
        {locationAlert && events ? (
          <LocationAlert setShowLocationAlert={setShowLocationAlert} userCountry={userCountry} setSearchForUserCountry={setSearchForUserCountry} />
        ) : null}
        {offlineText ? <OfflineAlert className="mb-2" text={offlineText} /> : null}
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
            userCountry={userCountry}
            userCountryFormatted={userCountryFormatted}
            searchForUserCountry={searchForUserCountry}
            setSearchForUserCountry={setSearchForUserCountry}
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
