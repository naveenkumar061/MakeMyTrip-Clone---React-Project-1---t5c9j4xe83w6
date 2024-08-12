import SpinnerMini from '../../utils/SpinnerMini';
import TrainsUnique from './TrainsUnique';

function TrainsInfo({ trainsList }) {
  const trainsListLength = trainsList?.length;

  if (!trainsList) return <SpinnerMini />;

  if (trainsListLength === 0)
    return (
      <p className="w-[65vw] rounded-md bg-yellow-200 h-fit p-4 text-center text-lg font-bold text-red-600 shadow-md">
        Please select a different filter, source, destination, or date and try
        again, as there are no available trains.
      </p>
    );

  // Render the list of available flights
  return (
    <div className="relative w-[90%] h-fit z-[1] md:w-[65vw] gap-16 flex flex-col">
      {trainsList?.map((train, index) => (
        <TrainsUnique
          key={index}
          index={index}
          listLength={trainsListLength}
          train={train}
        />
      ))}
    </div>
  );
}

export default TrainsInfo;
