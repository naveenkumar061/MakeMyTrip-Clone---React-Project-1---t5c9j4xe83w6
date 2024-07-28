import { flightClassCollection } from '../../../../assets/data/FlightClassCollection';
import FlightsSubClassClassesList from './FlightsSubClassClassesList';

function FlightsSubClassClasses() {
  const flightClassList = flightClassCollection;

  return (
    <div className="flex flex-col gap-1">
      {flightClassList.map((item, index) => (
        <FlightsSubClassClassesList key={index} flightClassListItem={item} />
      ))}
    </div>
  );
}

export default FlightsSubClassClasses;
