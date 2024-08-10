import { FaAngleDown } from 'react-icons/fa';
import { useHotelsMainContext } from '../../../context/Resort/HotelsMainContext';
import HotelsSubCityPopup from '../hotelssubterminal/hotelscitypopupstate/hotelssubcitypopup/HotelsSubCityPopup';
import HotelsSubCheckInPopup from '../hotelssubterminal/HotelsSubCheckInPopup';
import HotelsSubCheckOutPopup from '../hotelssubterminal/HotelsSubCheckOutPopup';
import HotelSubReservationServicePopup from '../hotelssubterminal/hotelssubreservationservice/HotelSubReservationServicePopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHotelById } from '../hotelsapicalls/useHotelById';
import Spinner from '../../../utils/Spinner';
import Room from './Room';
import { dataAmenities } from '../../../assets/data/Amenities';

const commonClass =
  'relative h-1/4 flex-col gap-2 w-full md:w-[20%] flex rounded-md bg-[#ffffff1a] px-4 font-semibold uppercase text-left cursor-default p-1';

function HotelIndividual() {
  const {
    isCityHotelPopupOpen,
    cityRef,
    hotelCity,
    handleCityClick,
    isEntryDateHotelPopupOpen,
    entryDateRef,
    longYearCheckIn,
    monthCheckIn,
    weekdayCheckIn,
    dayCheckIn,
    handleEntryDate,
    isExitDateHotelPopupOpen,
    exitDateRef,
    longYearCheckOut,
    monthCheckOut,
    weekdayCheckOut,
    dayCheckOut,
    handleExitDate,
    isReservationHotelPopupOpen,
    reservationRef,
    noOfRooms,
    noOfAdults,
    handleReservation,
    setSort,
    yearCheckIn,
    yearCheckOut,
  } = useHotelsMainContext();

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(useLocation().search);

  let hotel_id = searchParams.get('hotelID');

  function handleSubSearch() {
    const searchParams = new URLSearchParams();
    setSort('popular');
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

  const { isLoading, hotelDetails } = useHotelById(hotel_id);

  console.log(hotelDetails?.data);

  const {
    images,
    name,
    location,
    rating,
    avgCostPerNight,
    amenities,
    houseRules,
    childAndExtraBedPolicy,
    rooms,
  } = hotelDetails?.data || {};

  const amenitiesArray = amenities
    ?.map((amenity) => {
      const matchingAmenity = dataAmenities.find(
        (item) => item.name.toLowerCase() === amenity.toLowerCase()
      );
      return matchingAmenity;
    })
    .filter((item) => item !== undefined);

  return (
    <div className="mt-20 bg-[#f2f2f2] pb-8">
      <div className="flex flex-col h-fit md:flex-row md:h-[350px] p-4 items-center justify-center gap-4 bg-gradient-to-t from-[#15457b] to-[#051423] text-blue-400 text-sm">
        <div
          className={`${commonClass}`}
          onClick={handleCityClick}
          ref={cityRef}
        >
          <div className="flex items-center gap-4">
            <p className="uppercase">City, Area or Property</p>
            <FaAngleDown />
          </div>
          <p className="text-white">{hotelCity?.split(',')[0]}</p>
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
          className="text-md m-[20px] flex h-[40px] w-fit md:w-[10%] items-center justify-center rounded-[35px] bg-gradient-to-r from-[#53b2fe] to-[#065af3] p-3 font-bold uppercase text-white"
          onClick={handleSubSearch}
        >
          Search
        </button>
      </div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="w-full flex flex-col items-center justify-center h-auto">
          <div className="bg-white m-4 p-2 max-w-[1250px] rounded-lg flex flex-col">
            <div className="flex flex-col m-1 p-1 gap-16">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-24 md:gap-8">
                  <div className="flex flex-col gap-4 w-full md:w-3/4 h-[480px]">
                    <div className="flex gap-4 w-full h-full">
                      <img
                        src={images[0]}
                        alt={images[0]}
                        className="md:w-3/4 w-1/2 h-full rounded-md object-cover"
                      />
                      <div className="md:w-1/4 w-1/2 flex flex-col gap-4">
                        <img
                          src={images[1]}
                          alt={images[1]}
                          className="h-[48.5%] rounded-md object-cover"
                        />
                        <img
                          src={images[2]}
                          alt={images[2]}
                          className="h-[48.5%] rounded-md object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="font-bold text-2xl">
                        {name}, {location.split(',')[0]}
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="bg-[#0b58b4] rounded-md text-white text-3xl font-extrabold h-[70px] w-[70px] flex justify-center items-center">
                          {rating}
                        </div>
                        <p className="text-4xl font-semibold">/5</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-fit flex flex-col justify-center gap-5 w-full md:w-[30%] p-5 rounded-xl shadow-[2px_2px_10px_#d3d3d3]">
                    <div className="flex justify-between">
                      <p className="text-green-600 text-sm">
                        Room With Free Cancellation
                      </p>
                      <del className="text-gray-600">
                        ₹{Math.floor(avgCostPerNight * 1.2)}
                      </del>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-green-600 text-sm">
                        Free Cancellation till check-in
                      </p>
                      <p className="font-bold text-lg">
                        ₹ {Math.floor(avgCostPerNight)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-green-600 text-sm">
                        Book with ₹0 Payment
                      </p>
                      <p>
                        +₹{Math.floor((avgCostPerNight * 12) / 100)} taxes &
                        fees
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-24 flex flex-col gap-5">
                  <p className="border-b-4 border-black w-fit font-bold text-3xl hover:text-blue-600 hover:border-blue-600 cursor-pointer hover:scale-110 transition-all">
                    Amenities
                  </p>
                  <div className="w-full h-[200px]">
                    <div className="shadow-[5px_5px_18px_#d3d3d3] h-[50px] flex justify-evenly w-full border border-black items-center gap-5">
                      {amenitiesArray.map((amenity) => (
                        <span
                          key={amenity.name}
                          className="font-medium scale-[1.3] flex gap-3 items-center"
                        >
                          {amenity.icon}
                          {amenity.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid gap-x-[20%] grid-cols-2 gap-y-6">
                  <div className="bg-[rgba(119,136,153,.4)] rounded-md p-3 flex flex-col gap-1">
                    <p className="mb-4 underline font-bold text-lg">
                      Restrictions
                    </p>
                    <div className="flex gap-1 items-center">
                      <p className="font-medium">Pets Allowed:</p>
                      <p className="text-right">
                        {houseRules.restrictions.petsAllowed
                          .toString()
                          .toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="font-medium">Smoking Allowed:</p>
                      <p>
                        {houseRules.restrictions.smokingAllowed
                          .toString()
                          .toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[rgba(119,136,153,.4)] rounded-md p-3 flex flex-col gap-1">
                    <p className="mb-4 underline font-bold text-lg">
                      IdProofRelated
                    </p>
                    <div className="flex gap-1 items-center">
                      <p className="font-medium">Id Proofs Accepted:</p>
                      <ol>
                        {houseRules.idProofRelated.idProofsAccepted.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ol>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="font-medium">Local Id's Allowed:</p>
                      <p>
                        {houseRules.idProofRelated.localIdsAllowed
                          .toString()
                          .toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[rgba(119,136,153,.4)] rounded-md p-3 flex flex-col gap-1">
                    <p className="mb-4 underline font-bold text-lg">
                      Child And Extra Bed Policy
                    </p>
                    <div className="flex gap-1 items-center">
                      <p className="font-medium">Extra Bed For Child:</p>
                      <p>
                        {childAndExtraBedPolicy.extraBedProvidedForChild
                          .toString()
                          .toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="font-medium">Extra Bed For Guest:</p>
                      <p>
                        {childAndExtraBedPolicy.extraBedForAdditionalGuest
                          .toString()
                          .toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="font-medium">Extra Bed Charges:</p>
                      <p>{childAndExtraBedPolicy.extraBedCharge}</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="font-medium">Additional Info:</p>
                      <p>{childAndExtraBedPolicy.additionalInfo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr
              className="h-1 my-7 w-full bg-gray-300 shadow-[2px 5px
            30px lightgray] rounded-md"
            ></hr>
            <div className="flex flex-col gap-5 p-4">
              <p className="border-b-4 border-black w-fit font-bold text-3xl hover:text-blue-600 hover:border-blue-600 cursor-pointer hover:scale-110 transition-all">
                Rooms
              </p>
              {rooms.map((item, index) => (
                <Room key={index} item={item} index={index} images={images} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelIndividual;
