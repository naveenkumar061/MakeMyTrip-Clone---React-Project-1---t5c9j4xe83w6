import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';

function TravelDateNoPopup() {
  const { year, weekday, month, day } = useTrainsMainContext();

  return (
    <div>
      <h1 className="text-3xl font-bold">
        {day}
        <span className="pl-2 text-2xl font-normal">
          {month}'{year}
        </span>
      </h1>
      <p>{weekday}</p>
    </div>
  );
}

export default TravelDateNoPopup;
