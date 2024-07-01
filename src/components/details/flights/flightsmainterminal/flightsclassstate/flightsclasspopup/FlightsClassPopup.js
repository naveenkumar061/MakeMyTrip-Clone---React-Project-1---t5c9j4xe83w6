// Import statements
import React from "react"; // Importing React from the react library
import { useFlightsMainContext } from "../../../../../context/Flights/FlightsMainContext"; // Importing context from FlightsMainContext
import FlightsClassClasses from "./FlightsClassClasses"; // Importing FlightsClassClasses component
import FlyCT from "./FlyCT"; // Importing FlightsClassTravellers component

function FlightsClassPopup() {
  const { handleClassClose } = useFlightsMainContext(); // Destructuring handleClassClose from the context

  return (
    <div className="absolute right-0 z-10 flex h-auto w-1/3 flex-col gap-4 rounded-xl border border-gray-400 bg-white p-4 text-black">
      {/* Container for the popup, styled with Tailwind CSS */}
      <div className="flex items-center justify-between">
        {/* Travellers section with a heading and the FlightsClassTravellers component */}
        <h3>Travellers</h3>
        <FlyCT />
      </div>
      <div className="flex flex-col gap-2">
        {/* Class type section with a heading and the FlightsClassClasses component */}
        <h3>Choose Class Type</h3>
        <FlightsClassClasses />
      </div>
      <div
        onClick={handleClassClose}
        className="flex h-8 w-1/6 cursor-pointer items-center justify-center self-end rounded-full bg-gradient-to-r from-blue-300 to-blue-500 pb-1 text-center text-white"
      >
        {/* Apply button which triggers handleClassClose on click */}
        Apply
      </div>
    </div>
  );
}

export default FlightsClassPopup;
