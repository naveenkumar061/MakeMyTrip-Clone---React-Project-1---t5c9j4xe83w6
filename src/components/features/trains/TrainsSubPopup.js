import { CiSearch } from 'react-icons/ci';
import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';
import { useEffect } from 'react';
import { trainlist } from '../../assets/data/TrainList';
import TrainsSubPopupList from './TrainsSubPopupList';

function TrainsSubPopup({ destination }) {
  const { inputRef, search, setSearch } = useTrainsMainContext();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setSearch('');
  }, [setSearch]);

  let filteredTrainList = search
    ? trainlist.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    : trainlist;

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
        {filteredTrainList?.map((item, index) => (
          <TrainsSubPopupList
            key={index}
            trainInfo={item}
            destination={destination}
          />
        ))}
      </div>
      <div className="p-1"></div>
    </div>
  );
}

export default TrainsSubPopup;
