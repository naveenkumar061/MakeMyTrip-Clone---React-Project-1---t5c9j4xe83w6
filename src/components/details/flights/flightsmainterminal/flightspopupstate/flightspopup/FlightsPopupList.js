// Third-party library import
import React from "react";

// React component import from third-party library
import { PiAirplaneTakeoff } from "react-icons/pi";

// Context import
import { useFlightsMainContext } from "../../../../../context/Flights/FlightsMainContext";

// Functional component definition
function FlightsPopupList({ flightInfo, destination }) {
  // Destructuring chooseCity function from FlightsMainContext
  const { chooseCity } = useFlightsMainContext();

  return (
    // Clickable div representing a flight option
    <div
      onClick={(e) => chooseCity(flightInfo.city, e, destination)} // Click handler invoking chooseCity function
      className="flex w-full flex-col p-2 hover:bg-gray-200" // Flexbox container with padding and hover effect
    >
      {/* Flex container for flight information */}
      <div className="flex w-full items-center justify-between">
        {/* Flex container for flight city and country */}
        <div className="flex items-center gap-2">
          {/* Icon for airplane takeoff */}
          <PiAirplaneTakeoff />
          {/* Paragraph displaying city and country */}
          <p>
            {flightInfo.city}, {flightInfo.country}
          </p>
        </div>
        {/* Displaying flight IATA code */}
        <div className="text-gray-500">{flightInfo.iata_code}</div>
      </div>
    </div>
  );
}

// Exporting FlightsPopupList component as default
export default FlightsPopupList;
