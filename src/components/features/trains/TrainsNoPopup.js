import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';

function TrainsNoPopup({ destination }) {
  const { from, to } = useTrainsMainContext();

  let junction;

  if (destination === 'from') junction = from;

  if (destination === 'to') junction = to;

  return (
    <h1 className="overflow-hidden text-ellipsis text-3xl font-bold">
      {junction}
    </h1>
  );
}

export default TrainsNoPopup;
