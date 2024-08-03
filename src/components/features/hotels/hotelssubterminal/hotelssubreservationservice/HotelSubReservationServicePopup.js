import { useHotelsMainContext } from '../../../../context/Resort/HotelsMainContext';
import HotelSubAdultNumber from './HotelSubAdultNumber';
import HotelSubAdultQtyPopup from './HotelSubAdultQtyPopup';
import HotelSubRoomNumberSelector from './HotelSubRoomNumberSelector';
import HotelSubRoomQtyPopup from './HotelSubRoomQtyPopup';

function HotelSubReservationServicePopup() {
  const { isRoomQuantityPopup, isAdultQuantityPopup, handleReservationClose } =
    useHotelsMainContext();

  return (
    <div
      className={`absolute right-1 top-14 z-10 flex h-auto w-full flex-col gap-4 rounded-xl border border-gray-400 bg-white text-black`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between p-2">
          <p className="text-gray-600">Rooms</p>
          {!isRoomQuantityPopup && <HotelSubRoomNumberSelector />}
          {isRoomQuantityPopup && <HotelSubRoomQtyPopup />}
        </div>
        <div className="flex items-center justify-between p-2">
          <p className="text-gray-600">Adults</p>
          {!isAdultQuantityPopup && <HotelSubAdultNumber />}
          {isAdultQuantityPopup && <HotelSubAdultQtyPopup />}
        </div>
      </div>
      <div className="z-10 h-[1px] w-full bg-gray-200"></div>
      <div className="p-4">
        <p
          className={`relative left-[75%] flex h-8 w-[60px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 pb-1 text-center text-white`}
          onClick={handleReservationClose}
        >
          Apply
        </p>
      </div>
    </div>
  );
}

export default HotelSubReservationServicePopup;
