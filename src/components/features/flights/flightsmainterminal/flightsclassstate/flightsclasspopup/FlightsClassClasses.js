import { flightClassCollection } from '../../../../../assets/data/FlightClassCollection';
import FClsL from './FClsL';

function FlightsClassClasses() {
  return (
    // Container div with a flex display and a gap between items
    <div className="flex gap-1">
      {/* Mapping through the flight class list and rendering FlightsClassClassesList for each item */}
      {flightClassCollection.map((item, index) => (
        <FClsL key={index} flightClassListItem={item} />
      ))}
    </div>
  );
}

export default FlightsClassClasses;
