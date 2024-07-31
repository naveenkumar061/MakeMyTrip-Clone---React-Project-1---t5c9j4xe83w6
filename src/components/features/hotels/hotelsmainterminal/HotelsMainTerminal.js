import { FaAngleDown } from 'react-icons/fa';
import { useHotelsMainContext } from '../../../context/Resort/HotelsMainContext';
import HotelsCityNoPopup from './hotelscitypopupstate/hotelscitynopopup/HotelsCityNoPopup';
import HotelsCityPopup from './hotelscitypopupstate/hotelscitypopup/HotelsCityPopup';
import HotelsCheckInNoPopup from './hotelscheckindatehandlers/HotelsCheckInNoPopup';
import HotelsCheckInPopup from './hotelscheckindatehandlers/HotelsCheckInPopup';
import HotelsCheckOutPopup from './hotelscheckoutdatehandler/HotelsCheckOutPopup';
import HotelsCheckOutNoPopup from './hotelscheckoutdatehandler/HotelsCheckOutNoPopup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelResNoPopup from './hotelreservationservice/hotelresnopopup/HotelResNoPopup';
import HotelResvPopup from './hotelreservationservice/hotelresvpopup/HotelResvPopup';

const commonBorderStyle = 'border-gray-200 border-r-2';
const commonPadding = 'p-4';
const commonHoverStyle = 'hover:bg-blue-100';

function HotelsMainTerminal() {
  const {
    isCityHotelPopupOpen,
    cityRef,
    hotelCity,
    handleCityClick,
    isEntryDateHotelPopupOpen,
    entryDateRef,
    yearCheckIn,
    monthCheckIn,
    weekdayCheckIn,
    dayCheckIn,
    handleEntryDate,
    isExitDateHotelPopupOpen,
    exitDateRef,
    dateCheckOut,
    yearCheckOut,
    monthCheckOut,
    weekdayCheckOut,
    handleExitDate,
    isReservationHotelPopupOpen,
    reservationRef,
    noOfRooms,
    noOfAdults,
    handleReservation,
    handleClickOutside,
  } = useHotelsMainContext();

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  function handleMainSearch() {
    const searchParams = new URLSearchParams();
    searchParams.append('city', hotelCity);
    searchParams.append(
      'check-in-date',
      `${monthCheckIn}/${dayCheckIn}/${yearCheckIn}`
    );
    searchParams.append('check-in-day', weekdayCheckIn);
    searchParams.append(
      'check-out-date',
      `${monthCheckOut}/${dateCheckOut}/${yearCheckOut}`
    );
    searchParams.append('check-out-day', weekdayCheckOut);
    searchParams.append('rooms', noOfRooms);
    searchParams.append('adults', noOfAdults);

    navigate({
      pathname: '/hotels/search',
      search: `?${searchParams.toString()}`,
    });
  }

  return (
    <div className="relative my-6 max-1200:mb-0">
      <p className="h-[41.3333px] py-2"></p>
      <div className="relative flex rounded-md border-2 border-gray-200 flex-col md:flex-row">
        <div
          className={`flex-grow pr-8 ${
            isCityHotelPopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } ${commonBorderStyle} ${commonPadding} ${commonHoverStyle} w-full md:w-1/4`}
          onClick={handleCityClick}
          ref={cityRef}
        >
          <p>City, Property Name Or Location</p>
          {!isCityHotelPopupOpen && <HotelsCityNoPopup />}
          {isCityHotelPopupOpen && <HotelsCityPopup />}
        </div>
        <div
          className={`flex-grow ${commonBorderStyle} ${commonPadding} ${
            isEntryDateHotelPopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } ${commonHoverStyle} w-full md:w-[170.802px]`}
          onClick={handleEntryDate}
          ref={entryDateRef}
        >
          <div className="flex items-center gap-2">
            <p>Check-In</p>
            <p className="text-blue-400">
              <FaAngleDown />
            </p>
          </div>
          {!isEntryDateHotelPopupOpen && <HotelsCheckInNoPopup />}
          {isEntryDateHotelPopupOpen && <HotelsCheckInPopup />}
        </div>
        <div
          className={`flex-grow w-full md:w-[170.802px] ${commonBorderStyle} ${commonPadding} ${
            isExitDateHotelPopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } ${commonHoverStyle}`}
          onClick={handleExitDate}
          ref={exitDateRef}
        >
          <div className="flex items-center gap-2">
            <p>Check-Out</p>
            <p className="text-blue-400">
              <FaAngleDown />
            </p>
          </div>
          {!isExitDateHotelPopupOpen && <HotelsCheckOutNoPopup />}
          {isExitDateHotelPopupOpen && <HotelsCheckOutPopup />}
        </div>
        <div
          className={`w-full md:w-[247.885px] flex-grow ${commonPadding} ${commonHoverStyle} ${
            isReservationHotelPopupOpen &&
            'bg-blue-100 font-medium text-blue-400'
          }`}
          ref={reservationRef}
          onClick={handleReservation}
        >
          <div className="flex items-center gap-2">
            <p>Rooms & Guests</p>
            <p className="text-blue-400">
              <FaAngleDown />
            </p>
          </div>
          {!isReservationHotelPopupOpen && <HotelResNoPopup />}
          {isReservationHotelPopupOpen && <HotelResvPopup />}
        </div>
      </div>
      <button
        className="relative left-[40%] top-20 w-1/6 rounded-3xl bg-gradient-to-r from-blue-400 to-blue-600 px-12 py-1 text-center text-2xl font-semibold uppercase text-white max-1250:left-[25%] max-1250:top-12 max-1250:w-[45%] max-1250:p-0"
        onClick={handleMainSearch}
      >
        Search
      </button>
    </div>
  );
}

export default HotelsMainTerminal;
