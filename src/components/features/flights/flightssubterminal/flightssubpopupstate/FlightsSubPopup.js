import { CiSearch } from 'react-icons/ci';
import { useFlightsMainContext } from '../../../../context/Flights/FlightsMainContext';
import { useFlightsUsingCityName } from '../../flightsapicall/useFlightsUsingCityName';
import { useEffect } from 'react';
import FlightsSubPopupList from './FlightsSubPopupList';
import { getFlightsListUsingCityName } from '../../../../services/apiFlights';

function FlightsSubPopup({ destination }) {
  const { inputRef, search, setSearch, cityName, setCityName } =
    useFlightsMainContext();

  const { flightsByFilter } = useFlightsUsingCityName();
  const list = flightsByFilter?.data.airports;

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (search) setCityName(search);
    if (!search) setCityName(null);
    getFlightsListUsingCityName(cityName);
  }, [search, setCityName, cityName]);

  return (
    <div className="relative z-10 bg-white w-full left-0">
      <div className="flex items-center p-2 shadow-md">
        <CiSearch className="font-extrabold text-black" />
        <input
          ref={inputRef}
          placeholder={
            destination.charAt(0).toUpperCase() + destination.slice(1)
          }
          type="input"
          className="w-full pl-2 outline-none placeholder:text-gray-500 focus:cursor-default"
          value={search}
          onChange={(e) => {
            if (e.target.value.length > 0) setSearch(e.target.value);
            else setSearch('');
          }}
        />
      </div>
      <div className="h-[38vh] overflow-y-auto">
        {list?.map((item, index) => (
          <FlightsSubPopupList
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

export default FlightsSubPopup;
