import { IoIosArrowDown } from 'react-icons/io';
import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';
import { useEffect } from 'react';

function TrainsSort() {
  const {
    trainSortPopup,
    sortCard,
    handleSort,
    sortRef,
    handleClickOutside,
    sort,
  } = useTrainsMainContext();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => console.log(sort), [sort]);

  return (
    <div className="sticky top-20 z-[2] mb-8 flex h-[35px] items-center flex-wrap justify-start border border-b border-cyan-400 bg-cyan-100 px-20">
      <div className="flex gap-4">
        <h1 className="font-semibold uppercase">Sorted By:</h1>
        <p
          className="text-[#008cff] flex items-center justify-center gap-2 cursor-pointer"
          onClick={trainSortPopup}
        >
          {sort} <IoIosArrowDown />
        </p>
      </div>
      {sortCard && (
        <div
          ref={sortRef}
          className="absolute top-11 left-20 h-fit w-[18%] bg-white shadow-[2px_2px_10px_#d3d3d3] rounded-md p-3"
        >
          <ul>
            <li
              className="list-none mt-1 cursor-pointer hover:bg-gray-200"
              onClick={(event) => handleSort('Availablity (Default)', event)}
            >
              Availability (Default)
            </li>
            <li
              className="list-none mt-1 cursor-pointer hover:bg-gray-200"
              onClick={(event) => handleSort('Train Name', event)}
            >
              Train Name
            </li>
            <li
              className="list-none mt-1 cursor-pointer hover:bg-gray-200"
              onClick={(event) => handleSort('Departure', event)}
            >
              Departure
            </li>
            <li
              className="list-none mt-1 cursor-pointer hover:bg-gray-200"
              onClick={(event) => handleSort('Travel Time', event)}
            >
              Travel Time
            </li>
            <li
              className="list-none mt-1 cursor-pointer hover:bg-gray-200"
              onClick={(event) => handleSort('Arrival', event)}
            >
              Arrival
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default TrainsSort;
