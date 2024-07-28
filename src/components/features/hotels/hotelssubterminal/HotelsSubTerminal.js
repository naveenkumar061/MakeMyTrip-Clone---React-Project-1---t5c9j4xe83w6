import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HotelsSubCityPopup from './hotelscitypopupstate/hotelssubcitypopup/HotelsSubCityPopup';
import { FaAngleDown } from 'react-icons/fa';
import HotelsSubCheckInPopup from './HotelsSubCheckInPopup';
import HotelsSubCheckOutPopup from './HotelsSubCheckOutPopup';
import HotelSubReservationServicePopup from './hotelssubreservationservice/HotelSubReservationServicePopup';
import HotelsSort from '../hotelssort/HotelsSort';
import HotelsFilter from '../hotelsfilter/HotelsFilter';
import HotelsInCity from '../hotelsincity/HotelsInCity';
import { useHotelLoc } from '../hotelsapicalls/useHotelLoc';
import { useHotelsMainContext } from '../../../context/Resort/HotelsMainContext';
import Spinner from '../../../utils/Spinner';

const commonClass =
  'relative h-14 flex-col gap-2 w-[20%] flex rounded-md bg-[#ffffff1a] px-4 font-semibold uppercase text-left cursor-default';

function HotelsSubTerminal() {
  const {
    isCityHotelPopupOpen,
    cityRef,
    hotelCity,
    setHotelCity,
    handleCityClick,
    isEntryDateHotelPopupOpen,
    entryDateRef,
    longYearCheckIn,
    yearCheckIn,
    monthCheckIn,
    weekdayCheckIn,
    dayCheckIn,
    handleEntryDate,
    isExitDateHotelPopupOpen,
    exitDateRef,
    longYearCheckOut,
    yearCheckOut,
    monthCheckOut,
    weekdayCheckOut,
    dayCheckOut,
    handleExitDate,
    isReservationHotelPopupOpen,
    reservationRef,
    noOfRooms,
    noOfAdults,
    handleReservation,
    handleClickOutside,
    sort,
    filter,
  } = useHotelsMainContext();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cityInfo = searchParams.get('city');

  const [filteredSortedHotels, setFilteredSortedHotels] = useState();

  let { isLoading, hotelsInCity } = useHotelLoc(cityInfo, sort);

  // console.log(hotelsInCity, isLoading);

  useEffect(() => {
    setHotelCity(cityInfo);
  }, [cityInfo]);

  useEffect(() => {
    setFilteredSortedHotels(hotelsInCity?.data.hotels);
  }, [hotelsInCity]);

  console.log(filteredSortedHotels);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter]);

  function handleSubSearch() {
    const searchParams = new URLSearchParams();
    setFilteredSortedHotels('popular');
    searchParams.set('city', hotelCity);
    searchParams.set(
      'check-in-date',
      `${monthCheckIn}/${dayCheckIn}/${yearCheckIn}`
    );
    searchParams.set('check-in-day', weekdayCheckIn);
    searchParams.set(
      'check-out-date',
      `${monthCheckOut}/${dayCheckOut}/${yearCheckOut}`
    );
    searchParams.set('check-out-day', weekdayCheckOut);
    searchParams.set('rooms', noOfRooms);
    searchParams.set('adults', noOfAdults);
    navigate({
      pathname: '/hotels/search',
      search: `?${searchParams.toString()}`,
    });
  }

  return (
    <div className="relative w-full">
      <div className="flex h-[350px] items-center justify-center gap-4 bg-gradient-to-t from-[#15457b] to-[#051423] text-blue-400">
        <div
          className={`${commonClass}`}
          onClick={handleCityClick}
          ref={cityRef}
        >
          <div className="flex items-center gap-4">
            <p className="uppercase">City, Area or Property</p>
            <FaAngleDown />
          </div>
          <p className="text-white">{hotelCity.split(',')[0]}</p>
          {isCityHotelPopupOpen && <HotelsSubCityPopup />}
        </div>
        <div
          onClick={handleEntryDate}
          ref={entryDateRef}
          className={`${commonClass}`}
        >
          <div className="flex items-center gap-4">
            <p>Check - In</p>
            <FaAngleDown />
          </div>
          <p className="text-white">
            {weekdayCheckIn.slice(0, 3)}, {monthCheckIn} {dayCheckIn}{' '}
            {longYearCheckIn}
          </p>
          {isEntryDateHotelPopupOpen && <HotelsSubCheckInPopup />}
        </div>
        <div
          onClick={handleExitDate}
          ref={exitDateRef}
          className={`${commonClass}`}
        >
          <div className="flex items-center gap-4">
            <p>Check - Out</p>
            <FaAngleDown />
          </div>
          <p className="text-white">
            {weekdayCheckOut.slice(0, 3)}, {monthCheckOut} {dayCheckOut}{' '}
            {longYearCheckOut}
          </p>
          {isExitDateHotelPopupOpen && <HotelsSubCheckOutPopup />}
        </div>
        <div
          className={`${commonClass}`}
          onClick={handleReservation}
          ref={reservationRef}
        >
          <p>Rooms & Guests</p>
          <p className="text-white">
            {noOfRooms} {noOfRooms > 1 ? 'Rooms' : 'Room'}, {noOfAdults}
            {noOfAdults > 1 ? ' Adults' : ' Adult'}
          </p>
          {isReservationHotelPopupOpen && <HotelSubReservationServicePopup />}
        </div>
        <button
          className="text-md m-[20px] flex h-[40px] w-[10%] items-center justify-center rounded-[35px] bg-gradient-to-r from-[#53b2fe] to-[#065af3] p-3 font-bold uppercase text-white"
          onClick={handleSubSearch}
        >
          Search
        </button>
      </div>
      <HotelsSort />
      <div className="relative p-8">
        <HotelsFilter />
        {isLoading && <Spinner />}
        {!isLoading && <HotelsInCity hotelsList={hotelsInCity?.data.hotels} />}
      </div>
    </div>
  );
}

export default HotelsSubTerminal;
