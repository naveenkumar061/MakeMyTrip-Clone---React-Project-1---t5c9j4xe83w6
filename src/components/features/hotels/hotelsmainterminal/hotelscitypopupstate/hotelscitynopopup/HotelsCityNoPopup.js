import { useHotelsMainContext } from "../../../../../context/Hotels/HotelsMainContext";

function HotelsCityNoPopup() {
  const { hotelCity } = useHotelsMainContext();
  return (
    <div>
      <h1 className="pt-1 text-3xl font-bold">{hotelCity.split(",")[0]}</h1>
      <p>India</p>
    </div>
  );
}

export default HotelsCityNoPopup;
