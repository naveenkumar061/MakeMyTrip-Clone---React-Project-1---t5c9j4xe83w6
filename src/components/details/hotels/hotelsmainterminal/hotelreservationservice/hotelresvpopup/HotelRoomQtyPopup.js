import { useHotelsMainContext } from "../../../../../context/Hotels/HotelsMainContext";

function HotelRoomQtyPopup() {
  const { noOfRooms, handleNumberOfRooms } = useHotelsMainContext();

  const room = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="absolute bottom-[4.75rem] right-5 z-10 h-[16vh] overflow-y-auto rounded-md border border-gray-400 bg-white">
      {room.map((item, index) => (
        <div
          key={index}
          className={`${noOfRooms === item && "bg-gray-200"} px-4 py-1 text-center hover:bg-gray-200`}
          onClick={(event) => handleNumberOfRooms(event, item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default HotelRoomQtyPopup;
