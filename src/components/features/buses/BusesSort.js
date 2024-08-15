import { useBusesMainContext } from '../../context/Buses/BusesMainContext';
import Bus from '../../assets/images/bus.png';

function BusesSort() {
  const { sort, setSort } = useBusesMainContext();
  return (
    <div className="flex items-center">
      <p className="text-xs font-semibold mr-2">SORT BY</p>
      <ul className="text-sm items-center flex gap-4">
        <li
          className={`${
            sort === 'Name'
              ? 'bg-[rgb(234,245,255)] text-[rgb(0,140,255)]'
              : 'hover:bg-gray-100'
          } p-2 font-semibold cursor-pointer flex items-center justify-center gap-2 rounded-lg`}
          onClick={() => setSort('Name')}
        >
          Relevance
          {sort === 'Name' && (
            <div
              className="bg-no-repeat bg-[length:350px_500px] w-[9px] h-[12px] bg-[position:-255px_-19px] rotate-180 mt-1"
              style={{
                backgroundImage: `url(${Bus})`,
              }}
            ></div>
          )}
        </li>
        <li
          className={`${
            sort === 'Cheap'
              ? 'bg-[rgb(234,245,255)] text-[rgb(0,140,255)]'
              : 'hover:bg-gray-100'
          } p-2 font-semibold cursor-pointer rounded-lg flex items-center justify-center gap-2`}
          onClick={() => setSort('Cheap')}
        >
          Cheapest
          {sort === 'Cheap' && (
            <div
              className="bg-no-repeat bg-[length:350px_500px] w-[9px] h-[12px] bg-[position:-255px_-19px] rotate-180 mt-1"
              style={{
                backgroundImage: `url(${Bus})`,
              }}
            ></div>
          )}
        </li>
        <li
          className={`${
            sort === 'Arrival'
              ? 'bg-[rgb(234,245,255)] text-[rgb(0,140,255)]'
              : 'hover:bg-gray-100'
          } p-2 font-semibold cursor-pointer rounded-lg flex items-center justify-center gap-2`}
          onClick={() => setSort('Arrival')}
        >
          Arrival
          {sort === 'Arrival' && (
            <div
              className="bg-no-repeat bg-[length:350px_500px] w-[9px] h-[12px] bg-[position:-255px_-19px] rotate-180 mt-1"
              style={{
                backgroundImage: `url(${Bus})`,
              }}
            ></div>
          )}
        </li>
        <li
          className={`${
            sort === 'Departure'
              ? 'bg-[rgb(234,245,255)] text-[rgb(0,140,255)]'
              : 'hover:bg-gray-100'
          } p-2 font-semibold cursor-pointer rounded-lg flex items-center justify-center gap-2`}
          onClick={() => setSort('Departure')}
        >
          Departure
          {sort === 'Departure' && (
            <div
              className="bg-no-repeat bg-[length:350px_500px] w-[9px] h-[12px] bg-[position:-255px_-19px] rotate-180 mt-1"
              style={{
                backgroundImage: `url(${Bus})`,
              }}
            ></div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default BusesSort;
