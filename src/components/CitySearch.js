// src/components/CitySearch.js

import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoText, setErrorText }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query) setSuggestions(allLocations);
  }, [query, allLocations])

  const handleInputChanged = (event) => {
    const value = event.target.value;
    let filteredLocations = "";
    let infoText;
    let errorText;

    setQuery(value);

    console.log(typeof value, value);

    if (value && /\d/.test(value) === true) { //regex test to check if input value contains a digit
      errorText = "Please only use letters and not numbers when searching for a city"
    } else {
      errorText = ""
    }
    setErrorText(errorText)

    if (value) {
      filteredLocations = allLocations
        ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
        : [];
      setShowSuggestions(true);
      setSuggestions(filteredLocations);
    } else {
      setSuggestions(allLocations);
    }

    if (value && !filteredLocations.length) {
      infoText = "We can not find the city you are looking for. Please try another city or choose \"See all cities\""
    } else {
      infoText = ""
    }
    setInfoText(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // to hide the list
    setCurrentCity(value);
    setInfoText("")
    setErrorText("")
  };

  return (
    <div id="city-search" data-testid="city-search">
      <input
        type="text"
        className="city"
        placeholder="Ex: Berlin, Germany"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li key={suggestion} onMouseDown={handleItemClicked}>
                {suggestion}
              </li>
            );
          })}
          <li key="See all cities" onMouseDown={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
