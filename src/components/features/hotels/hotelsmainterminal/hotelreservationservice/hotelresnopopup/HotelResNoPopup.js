import { useHotelsMainContext } from "../../../../../context/Hotels/HotelsMainContext";

function HotelResNoPopup() {
  const { noOfRooms, noOfAdults } = useHotelsMainContext();

  return (
    <div className="flex">
      <h1 className="pt-1 text-3xl font-bold">
        {noOfRooms}
        <span className="pr-1 text-2xl font-normal">Room</span>
      </h1>
      <h1 className="pt-1 text-3xl font-bold">
        {noOfAdults}
        <span className="pr-1 text-2xl font-normal">Adults</span>
      </h1>
    </div>
  );
}

export default HotelResNoPopup;
