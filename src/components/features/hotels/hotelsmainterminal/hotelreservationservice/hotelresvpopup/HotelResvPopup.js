import { useHotelsMainContext } from '../../../../../context/Resort/HotelsMainContext';
import HotelAdultNumber from './HotelAdultNumber';
import HotelAdultQtyPopup from './HotelAdultQtyPopup';
import HotelRS from './HotelRS';
import HotelRoomQtyPopup from './HotelRoomQtyPopup';

function HotelResvPopup() {
  const { isRoomQuantityPopup, isAdultQuantityPopup, handleReservationClose } =
    useHotelsMainContext();

  return (
    <div
      className={`absolute md:left-[67%] z-10 flex h-auto w-full left-0 md:w-1/3 flex-col gap-4 rounded-xl border border-gray-400 bg-white text-black`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between p-2">
          <p className="text-gray-600">Rooms</p>
          {!isRoomQuantityPopup && <HotelRS />}
          {isRoomQuantityPopup && <HotelRoomQtyPopup />}
        </div>
        <div className="flex items-center justify-between p-2">
          <p className="text-gray-600">Adults</p>
          {!isAdultQuantityPopup && <HotelAdultNumber />}
          {isAdultQuantityPopup && <HotelAdultQtyPopup />}
        </div>
      </div>
      <div className="z-10 h-[1px] w-full bg-gray-200"></div>
      <div className=" p-4">
        <p
          className={`relative left-[75%] flex h-8 w-1/4 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 pb-1 text-center text-white`}
          onClick={handleReservationClose}
        >
          Apply
        </p>
      </div>
    </div>
  );
}

export default HotelResvPopup;
