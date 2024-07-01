import { CiSearch } from "react-icons/ci";
import { useHotelsMainContext } from "../../../../../context/Hotels/HotelsMainContext";
import { useEffect, useRef, useState } from "react";
import HotelsCityPopupList from "./HotelsCityPopupList";
import Spinner from "../../../../../ui/Spinner";

function HotelsCityPopup() {
  const { hotelsLocation, hotelsLocationsLoading } = useHotelsMainContext();

  console.log(hotelsLocation, hotelsLocationsLoading);

  const cityLocation = hotelsLocation?.data.cities;

  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] = useState(cityLocation);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setFilteredCities(
      cityLocation.filter((city) =>
        city.cityState.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, cityLocation]);

  return (
    <div className="absolute left-0 z-30 w-[40%] rounded-md border border-gray-400 bg-white text-gray-800 shadow-lg">
      <div className="flex items-center justify-between gap-4 border-b border-gray-400 p-2">
        <CiSearch className="font-extrabold text-black" />
        <input
          type="input"
          ref={inputRef}
          placeholder="Where do you want to stay?"
          className="w-full pl-2 outline-none placeholder:font-normal placeholder:text-gray-400 focus:cursor-default"
          value={search}
          onChange={(e) => {
            if (e.target.value.length > 0 && /^[a-zA-Z]+$/.test(e.target.value))
              setSearch(e.target.value);
            else setSearch("");
          }}
        />
      </div>
      {hotelsLocationsLoading && <Spinner />}
      {!hotelsLocationsLoading && (
        <div className="h-[38vh] w-full overflow-y-auto">
          {filteredCities.map((city) => (
            <HotelsCityPopupList key={city._id} cityState={city.cityState} />
          ))}
        </div>
      )}
      <div className="p-1"></div>
    </div>
  );
}

export default HotelsCityPopup;
