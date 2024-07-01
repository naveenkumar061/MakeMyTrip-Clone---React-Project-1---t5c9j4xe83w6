// Third-party libraries
import React from "react";

// Components from the application
import FlightsMainTerminal from "../details/flights/flightsmainterminal/FlightsMainTerminal";

// Functional component for Flights
function Flights() {
  return (
    <div className="relative bottom-12 mx-4 h-auto rounded-md bg-white px-4 py-8 text-black max-1350:top-10 max-1250:top-8">
      <FlightsMainTerminal />
    </div>
  );
}

// Export the Flights component as default
export default Flights;
