// Importing the flight class data collection from a relative path
import { flightClassCollection } from "../../../../../data/Info/flights/FlightClassCollection";

// Importing the FlightsClassClassesList component from the current directory
import FClsL from "./FClsL";

function FlightsClassClasses() {
  // Assigning the imported flight class collection to a constant
  const flightClassList = flightClassCollection;

  return (
    // Container div with a flex display and a gap between items
    <div className="flex gap-1">
      {/* Mapping through the flight class list and rendering FlightsClassClassesList for each item */}
      {flightClassList.map((item, index) => (
        <FClsL key={index} flightClassListItem={item} />
      ))}
    </div>
  );
}

export default FlightsClassClasses;
