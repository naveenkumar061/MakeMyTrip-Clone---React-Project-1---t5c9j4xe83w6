import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from './useBookings';
import Spinner from '../utils/Spinner';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

function Trips() {
  const [toggleTab, setToggleTab] = useState(false);
  const [bookingList, setBookingList] = useState(0);
  const [upcomingList, setUpcomingList] = useState(0);

  function handleToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const { booking, isLoading } = useBookings();

  console.log(booking?.data);

  const bookingArray = booking?.data;

  const bookUpcomeList = bookingArray?.filter(
    (item) => item.end_date > new Date().toISOString()
  );

  const bookCompletedList = bookingArray?.filter(
    (item) => item.end_date <= new Date().toISOString()
  );

  useEffect(() => {
    setBookingList(bookCompletedList?.length);
    setUpcomingList(bookUpcomeList?.length);
  }, [bookingArray]);

  return (
    <>
      <div className="mt-4 bg-[linear-gradient(261deg,#7dbfcc,#5ee7cd)] h-[210px] p-[30px] shadow-[0_3px_10px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-1 min-1200:max-w-[1200px] mx-auto text-base text-[#0009] font-black py-8 sm:p-8">
          <div>My Account</div>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
          >
            <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
          </svg>
          <div>My Trips</div>
        </div>
      </div>
      {isLoading && <Spinner />}
      <div className="w-full mx-auto box-border block px-6 min-1200:max-w-[1200px]">
        <div className="-mt-[110px] sticky top-0 z-[2] p-5 bg-white rounded-tl-lg rounded-tr-lg shadow-[0_2px_20px_#0000001a] flex flex-row w-full justify-between">
          <div className="m-5 sm:w-[478px]">
            <ul className="flex list-none gap-5">
              <li
                className={`flex items-center text-base font-bold cursor-pointer ${
                  toggleTab ? '' : 'text-[#9b9b9b]'
                }`}
                onClick={() => setToggleTab(!toggleTab)}
              >
                <div className="upcomingtripimg"></div>
                <p>UPCOMING</p>
              </li>
              <li
                className={`flex items-center text-base font-bold cursor-pointer ${
                  !toggleTab ? '' : 'text-[#9b9b9b]'
                }`}
                onClick={() => setToggleTab(!toggleTab)}
              >
                <div className="completedtripimg"></div>
                <p>COMPLETED</p>
              </li>
            </ul>
          </div>
        </div>
        {toggleTab && (
          <div className="rounded-bl-lg rounded-br-lg p-5 shadow-[0_2px_20px_#0000001a] bg-white flex flex-col items-center mb-4">
            <div className="flex flex-col items-center w-full text-center">
              {upcomingList === 0 && (
                <p className="mb-2 text-xl font-black text-[#4a4a4a]">
                  Looks empty, you've no upcoming bookings.
                </p>
              )}
              {upcomingList > 0 && (
                <div className="flex items-center bg-[linear-gradient(261deg,#d39696,#edcece)] w-[90%] py-3 px-8 mb-5 rounded-md shadow-[#00000026_0_0_15px]">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="mr-5"
                    height="25"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"></path>
                  </svg>
                  <div className="flex flex-col w-full gap-4">
                    {bookUpcomeList?.map((item, index) => {
                      return (
                        <div
                          className="border-b w-full flex items-center pb-2 justify-between"
                          key={index}
                        >
                          <div className="flex flex-grow-[3] flex-shrink-[1] text-lg font-medium text-black text-left flex-col items-start w-[240px]">
                            <p className="text-[#008cff]">
                              <span className="capitalize">
                                {item.booking_type}
                              </span>{' '}
                              Booking Type
                            </p>
                            <p className="text-xs">Booking Id : {item._id}</p>
                          </div>
                          <div className="flex flex-col gap-[.3rem] w-[320px]">
                            <div className="text-lg font-medium text-black text-left flex flex-row items-start">
                              Arrival Date :{' '}
                              {format(
                                utcToZonedTime(item.start_date, 'UTC'),
                                'dd-MM-yyyy'
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-[.3rem]">
                            <div className="text-lg font-medium text-black text-left flex flex-row items-start">
                              Departure Date :{' '}
                              {format(
                                utcToZonedTime(item.end_date, 'UTC'),
                                'dd-MM-yyyy'
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="mb-6 text-sm text-[#4a4a4a]">
                When you book a trip, you will see your itinerary here.
              </p>
              <Link
                className="text-xs text-white shadow-[0_3px_4px_#0003] bg-[linear-gradient(94deg,#53b2fe,#065af3)] font-black py-3 px-5 rounded-3xl"
                to="/flights"
              >
                PLAN A TRIP
              </Link>
            </div>
          </div>
        )}
        {!toggleTab && (
          <div className="rounded-bl-lg rounded-br-lg p-5 shadow-[0_2px_20px_#0000001a] bg-white flex flex-col items-center mb-4">
            <div className="w-[90%] py-3 px-8 mb-5 rounded-md shadow-[#00000026_0_0_15px] bg-[linear-gradient(261deg,#d39696,#edcece)] flex sm:items-center text-left cursor-default">
              {bookingList === 0 ? (
                <div className="flex flex-col items-center w-full text-center">
                  <p className="mb-2 text-lg font-bold text-[#4a4a4a]">
                    No completed trips yet.
                  </p>
                  <p className="mb-4 text-sm text-[#4a4a4a]">
                    Once you complete a trip, details will appear here.
                  </p>
                </div>
              ) : (
                <>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="mr-5"
                    height="25"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"></path>
                  </svg>
                  <div className="flex flex-col w-full gap-4">
                    {!bookCompletedList && <Spinner />}
                    {bookCompletedList?.map((item, index) => {
                      return (
                        <div
                          className="border-b w-full flex items-center pb-2 justify-between"
                          key={index}
                        >
                          <div className="flex flex-grow-[3] flex-shrink-[1] text-lg font-medium text-black text-left flex-col items-start w-[240px]">
                            <p className="text-[#008cff]">
                              <span className="capitalize">
                                {item.booking_type}
                              </span>{' '}
                              Booking Type
                            </p>
                            <p className="text-xs">Booking Id : {item._id}</p>
                          </div>
                          <div className="flex flex-col gap-[.3rem] w-[320px]">
                            <div className="text-lg font-medium text-black text-left flex flex-row items-start">
                              Arrival Date :{' '}
                              {format(
                                utcToZonedTime(item.start_date, 'UTC'),
                                'dd-MM-yyyy'
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-[.3rem]">
                            <div className="text-lg font-medium text-black text-left flex flex-row items-start">
                              Departure Date :{' '}
                              {format(
                                utcToZonedTime(item.end_date, 'UTC'),
                                'dd-MM-yyyy'
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <div
          className="outline-none py-4 px-8 rounded-[40px] shadow-[0_3px_22px_#0003] bg-white flex justify-center items-center text-[#008cff] text-sm font-semibold lg:ml-[960px] cursor-pointer"
          onClick={handleToTop}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="mr-3"
            height="40"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M6 17.59L7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"></path>
            <path d="M6 11l1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"></path>
          </svg>
          Back To Top
        </div>
      </div>
    </>
  );
}

export default Trips;
