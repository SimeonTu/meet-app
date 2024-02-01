// src/components/EventList.js
import { useState } from "react";

const NumberOfEvents = () => {
  const [value, setValue] = useState(32);

  return (
    <div data-testid="number-of-events">
      <input
        type="text"
        className="city"
        placeholder="Specify number of events"
        value={value}
        //   onFocus={() => setShowSuggestions(true)}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default NumberOfEvents;
