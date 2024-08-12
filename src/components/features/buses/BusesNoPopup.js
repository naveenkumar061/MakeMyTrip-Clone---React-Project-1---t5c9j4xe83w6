import { useBusesMainContext } from '../../context/Buses/BusesMainContext';

function BusesNoPopup({ destination }) {
  const { from, to } = useBusesMainContext();

  let city;

  if (destination === 'from') city = from;

  if (destination === 'to') city = to;
  return (
    <h1 className="overflow-hidden text-ellipsis text-3xl font-bold">{city}</h1>
  );
}

export default BusesNoPopup;
