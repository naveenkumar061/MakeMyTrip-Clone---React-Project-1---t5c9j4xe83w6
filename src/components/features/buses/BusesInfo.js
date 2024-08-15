import Spinner from '../../utils/Spinner';
import BusUnique from './BusUnique';

function BusesInfo({ filteredSortedBuses }) {
  if (!filteredSortedBuses) <Spinner />;
  if (filteredSortedBuses?.length === 0)
    return (
      <p className="w-[65vw] rounded-md bg-yellow-200 h-fit p-4 text-center text-lg font-bold text-red-600 shadow-md">
        Please select a different filter, source, destination, or date and try
        again, as there are no available buses.
      </p>
    );
  return (
    <div className="flex flex-col w-full gap-2">
      {filteredSortedBuses?.map((item, index) => (
        <BusUnique item={item} key={item._id} />
      ))}
    </div>
  );
}

export default BusesInfo;
