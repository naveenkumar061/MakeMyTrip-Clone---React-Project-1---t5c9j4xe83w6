import { useEffect } from 'react';
import { useBusesMainContext } from '../../context/Buses/BusesMainContext';
import { buslist } from '../../assets/data/BusList';
import { CiSearch } from 'react-icons/ci';
import BusPopupList from './BusPopupList';

function BusesPopup({ destination }) {
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
    <div
      className={`${
        destination === 'from' ? 'left-0' : 'md:left-[27%]'
      } absolute md:w-[40%] left-0 z-30 rounded-md border border-gray-400 bg-white text-gray-800 shadow-lg w-full`}
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
            if (e.target.value.length > 0 && /^[a-zA-Z]+$/.test(e.target.value))
              setSearch(e.target.value);
            else setSearch('');
          }}
          className="w-full pl-2 outline-none placeholder:text-gray-500 focus:cursor-default"
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

export default BusesPopup;
