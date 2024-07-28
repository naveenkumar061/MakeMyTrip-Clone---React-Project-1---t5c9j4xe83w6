// Third-party libraries
import { useEffect } from 'react';

// Contexts
import { useFlightsMainContext } from '../../../../../context/Flights/FlightsMainContext';
import { useFlightsUsingCityName } from '../../../flightsapicall/useFlightsUsingCityName';

// Components
import FlightsPopupList from './FlightsPopupList';

// Icons
import { CiSearch } from 'react-icons/ci';
import { getFlightsListUsingCityName } from '../../../../../services/apiFlights';

function FlightsPopup({ destination }) {
  // Destructuring values from context
  const { inputRef, search, setSearch, cityName, setCityName } =
    useFlightsMainContext();

  // Accessing data from another custom hook
  const { flightsByFilter } = useFlightsUsingCityName();
  const list = flightsByFilter?.data.airports;

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Effect to fetch flights list based on cityName when search changes
  useEffect(() => {
    if (search) setCityName(search);
    if (!search) setCityName(null);
    getFlightsListUsingCityName(cityName);
  }, [search, setCityName, cityName]);

  return (
    <div
      className={`absolute ${
        destination === 'from' ? 'left-0' : 'right-[32.45%]'
      } z-30 w-[35%] rounded-md border border-gray-400 bg-white text-gray-800 shadow-lg`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-gray-400 p-2">
        <CiSearch className="font-extrabold text-black" />
        <input
          type="input"
          ref={inputRef}
          placeholder={
            destination.charAt(0).toUpperCase() + destination.slice(1)
          }
          value={search}
          onChange={(e) => {
            // Validate input to accept only alphabets
            if (e.target.value.length > 0 && /^[a-zA-Z]+$/.test(e.target.value))
              setSearch(e.target.value);
            else setSearch('');
          }}
          className="w-full pl-2 outline-none placeholder:text-gray-500 focus:cursor-default"
        />
      </div>
      <div className="h-[38vh] overflow-y-auto">
        {list?.map((item, index) => (
          <FlightsPopupList
            key={index}
            flightInfo={item}
            destination={destination}
          />
        ))}
      </div>
      <div className="p-1"></div>
    </div>
  );
}

export default FlightsPopup;
