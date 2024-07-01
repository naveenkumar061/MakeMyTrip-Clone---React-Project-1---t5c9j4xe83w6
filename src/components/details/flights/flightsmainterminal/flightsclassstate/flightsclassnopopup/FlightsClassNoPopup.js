// React component for displaying flight class information without a popup

// Import statements

// External dependencies
import React from "react";

// Context and hooks
import { useFlightsMainContext } from "../../../../../context/Flights/FlightsMainContext";

function FlightsClassNoPopup() {
  // Destructure values from the FlightsMainContext
  const { number, classType } = useFlightsMainContext();

  return (
    <div>
      {/* Display the number of travellers */}
      <h1 className="text-3xl font-bold">
        {number}
        <span className="pl-2 text-2xl font-normal">Traveller</span>
      </h1>
      {/* Display the class type */}
      <p>{classType}</p>
    </div>
  );
}

export default FlightsClassNoPopup;
