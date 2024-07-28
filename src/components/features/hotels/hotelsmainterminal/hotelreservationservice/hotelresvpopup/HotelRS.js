import { FaAngleDown } from 'react-icons/fa';
import { useHotelsMainContext } from '../../../../../context/Resort/HotelsMainContext';

function HotelRS() {
  const { noOfRooms, handleRoomQuantity } = useHotelsMainContext();

  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-5 rounded-md border border-gray-300 px-2 py-1 text-blue-400 shadow-md"
      onClick={handleRoomQuantity}
    >
      <p className="font-bold text-black">{noOfRooms}</p>
      <FaAngleDown />
    </div>
  );
}

export default HotelRS;
