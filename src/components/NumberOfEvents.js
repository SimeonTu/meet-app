// src/components/EventList.js
import { useState } from "react";

const NumberOfEvents = ({ setEvents, filteredEvents, setNumberOfEvents, events }) => {
  const [value, setValue] = useState(32);

  function handleChange(event) {

    setValue(event.target.value)
    setEvents(filteredEvents.slice(0, event.target.value));
    setNumberOfEvents(event.target.value)

  }

  return (
    <div className="d-flex" data-testid="number-of-events">
      <input style={{ accentColor: "#EFD2D3" }}
        type="range"
        id="events"
        name="events"
        min={1}
        max={32}
        list="values"
        className="city"
        value={value}
        onChange={handleChange}
        disabled={!events ? true : false}
      />

      <datalist id="values">
        <option value="1"></option>
        <option value="8"></option>
        <option value="16"></option>
        <option value="24"></option>
        <option value="32"></option>
      </datalist>

      <label htmlFor="events" className="ms-2" style={{ width: "20px" }}>
        <span>
          {value}
        </span>
      </label>
    </div>
  );
};

export default NumberOfEvents;
