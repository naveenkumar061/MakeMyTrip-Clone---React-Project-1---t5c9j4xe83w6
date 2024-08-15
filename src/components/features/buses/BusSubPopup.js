import { useEffect } from 'react';
import { useBusesMainContext } from '../../context/Buses/BusesMainContext';
import { buslist } from '../../assets/data/BusList';
import { CiSearch } from 'react-icons/ci';
import BusPopupList from './BusPopupList';

function BusSubPopup({ destination }) {
  const { inputRef, search, setSearch } = useBusesMainContext();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setSearch('');
  }, [setSearch]);

  let filteredBusList = search
    ? buslist.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    : buslist;

  return (
    <div className="relative z-10 bg-white w-full left-0 text-gray-800 rounded-md">
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
        {filteredBusList?.map((item, index) => (
          <BusPopupList key={index} busInfo={item} destination={destination} />
        ))}
      </div>
      <div className="p-1"></div>
    </div>
  );
}

export default BusSubPopup;
