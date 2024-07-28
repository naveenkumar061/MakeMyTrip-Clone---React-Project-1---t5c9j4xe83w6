import React from 'react';
import FlightsMainTerminal from '../features/flights/flightsmainterminal/FlightsMainTerminal';
function Flights() {
  return (
    <div className="relative bottom-12 mx-4 h-auto rounded-md bg-white px-4 py-8 text-black max-1350:top-10 max-1250:top-8">
      <FlightsMainTerminal />
    </div>
  );
}

export default Flights;
