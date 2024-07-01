import { CiLocationOn } from "react-icons/ci";
import { useHotelsMainContext } from "../../../../../context/Hotels/HotelsMainContext";

function HotelsCityPopupList({ cityState }) {
  const { chooseHotelCity } = useHotelsMainContext();

  return (
    <div
      className="flex w-full items-center gap-4 p-2 hover:bg-gray-200"
      onClick={(e) => chooseHotelCity(cityState, e)}
    >
      <CiLocationOn />
      <p className="font-normal text-gray-800">{cityState}</p>
    </div>
  );
}

export default HotelsCityPopupList;
