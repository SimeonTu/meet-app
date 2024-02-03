// src/components/CitySearch.js

import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    console.log(allLocations);
    setSuggestions(allLocations);
  }, [allLocations]); //potential infinite loop?? if yes, change back to JSON.stringify(allLocations)

  const handleInputChanged = (event) => {
    const value = event.target.value;

    if (value) {
      const filteredLocations = allLocations
        ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
          })
        : [];
      setShowSuggestions(true);
      setSuggestions(filteredLocations);
    } else {
      setSuggestions(allLocations);
    }

    setQuery(value);
  };

  const handleItemClicked = (event) => {
    event.preventDefault();
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // to hide the list
    setCurrentCity(value);
  };

  return (
    <div id="city-search" data-testid="city-search" className="me-3">
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
