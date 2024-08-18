import React, { useEffect, useState } from 'react';
import Bus from '../../assets/images/bus.png';
import { useBusesMainContext } from '../../context/Buses/BusesMainContext';
import { format } from 'date-fns';
import { useLoginContext } from '../../context/login/LoginContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../../utils/Modal';
import Login from '../../pages/Login';

function SelectSeat({ departureDate, item, travelDuration }) {
  const { from, to, weekday, month, day, longYear, date } =
    useBusesMainContext();
  const { isAuthenticated } = useLoginContext();
  const { name, fare, arrivalTime, departureTime, type, seats, _id } = item;

  const [seatsList, setSeatsList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  function toggleSeatSelection(seatNumber) {
    setSeatsList((prevSeatsList) => {
      if (prevSeatsList.includes(seatNumber))
        return prevSeatsList.filter((seat) => seat !== seatNumber);
      else return [...prevSeatsList, seatNumber];
    });
  }

  // Ensure firstSideSeats is an even number and greater than secondSideSeats
  let firstSideSeats = Math.ceil(seats / 2);
  if (firstSideSeats % 2 !== 0) {
    firstSideSeats += 1; // Make it even
  }

  // Calculate secondSideSeats ensuring firstSideSeats is greater
  const secondSideSeats = seats - firstSideSeats;

  const firstSideSeatNumber = [];
  for (let i = 1; i <= firstSideSeats; i++) firstSideSeatNumber.push(i);

  const secondSideSeatNumber = [];
  for (let i = 1; i <= secondSideSeats; i++)
    secondSideSeatNumber.push(firstSideSeats + i);

  const firstSideLeftSeats = firstSideSeatNumber.slice(
    0,
    firstSideSeatNumber.length / 2
  );
  const firstSideRightSeats = firstSideSeatNumber.slice(
    firstSideSeatNumber.length / 2
  );

  const secondSideLeftSeats = secondSideSeatNumber.slice(
    0,
    secondSideSeatNumber.length % 2 === 0
      ? secondSideSeatNumber.length / 2
      : secondSideSeatNumber.length / 2 + 1
  );

  const secondSideRightSeats = secondSideSeatNumber.slice(
    secondSideSeatNumber.length % 2 === 0
      ? secondSideSeatNumber.length / 2
      : secondSideSeatNumber.length / 2 + 1
  );

  const isSelected = (seatNumber) => seatsList.includes(seatNumber);

  const [finalPrice, setFinalPrice] = useState(seatsList.length * fare);

  useEffect(() => {
    setFinalPrice(seatsList.length * fare);
  }, [seatsList]);

  function handleNavigateBooking() {
    if (isAuthenticated) {
      const searchParams = new URLSearchParams();
      searchParams.append('busName', name);
      searchParams.append('arrivalDate', date);
      searchParams.append('departureDate', departureDate);
      searchParams.append('type', type);
      searchParams.append('seats', seatsList);
      searchParams.append('arrivalTime', arrivalTime);
      searchParams.append('departureTime', departureTime);
      searchParams.append('travelDuration', travelDuration);
      searchParams.append('from', from);
      searchParams.append('to', to);
      searchParams.append('fare', fare);
      searchParams.append('busId', _id);
      searchParams.append('type', type);
      navigate({
        pathname: '/bus-tickets/results/booking',
        search: `?${searchParams.toString()}`,
      });
    } else {
      setOpenModal(true);
    }
  }

  return (
    <div className="bg-white my-4 px-[25px] w-full flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2 border border-[#dedede] rounded-md p-2">
        <p className="mr-[15px] mb-[8px] text-base font-bold">Select Seats</p>
        <div className="border-[#dedede] flex border justify-center gap-24 mx-8 p-4 rounded">
          <div className="flex gap-2 items-start justify-start">
            <div className="flex flex-col gap-2">
              {firstSideLeftSeats.map((item, index) => (
                <div
                  key={index}
                  className={`bg-no-repeat bg-[length:350px_500px] mr-[11px]
                    w-[26px] h-[26px] cursor-pointer ${
                      isSelected(item)
                        ? 'bg-[position:-127px_-381px]'
                        : 'bg-[position:-148px_-89px]'
                    }`}
                  style={{
                    backgroundImage: `url(${Bus})`,
                  }}
                  onClick={() => toggleSeatSelection(item)}
                ></div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {firstSideRightSeats.map((item, index) => (
                <div
                  key={index}
                  className={`bg-no-repeat bg-[length:350px_500px] mr-[11px]
                    w-[26px] h-[26px] cursor-pointer ${
                      isSelected(item)
                        ? 'bg-[position:-127px_-381px]'
                        : 'bg-[position:-148px_-89px]'
                    }`}
                  style={{
                    backgroundImage: `url(${Bus})`,
                  }}
                  onClick={() => toggleSeatSelection(item)}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              {secondSideLeftSeats.map((item, index) => (
                <div
                  key={index}
                  className={`bg-no-repeat bg-[length:350px_500px] mr-[11px]
                    w-[26px] h-[26px] cursor-pointer ${
                      isSelected(item)
                        ? 'bg-[position:-127px_-381px]'
                        : 'bg-[position:-148px_-89px]'
                    }`}
                  style={{
                    backgroundImage: `url(${Bus})`,
                  }}
                  onClick={() => toggleSeatSelection(item)}
                ></div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {secondSideRightSeats.map((item, index) => (
                <div
                  key={index}
                  className={`bg-no-repeat bg-[length:350px_500px] mr-[11px]
                   w-[26px] h-[26px] cursor-pointer ${
                     isSelected(item)
                       ? 'bg-[position:-127px_-381px]'
                       : 'bg-[position:-148px_-89px]'
                   }`}
                  style={{
                    backgroundImage: `url(${Bus})`,
                  }}
                  onClick={() => toggleSeatSelection(item)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 border border-[#dedede] rounded-md p-2 flex flex-col justify-between">
        <div>
          <p className="mr-[15px] mb-[8px] text-base font-bold">
            Pick Up and Drop Points
          </p>
          <div className="flex justify-around items-center">
            <div className="h-[120px] w-1/2 mr-[15px] rounded-[12px] border border-[#cecece] flex flex-col">
              <p className="py-2 px-3 bg-gray-200 font-black text-xs uppercase text-gray-700 m-0 rounded-t-lg flex flex-col">
                Pickup Point
              </p>
              <div className="p-4 flex flex-col gap-2">
                <p className="text-[#757575] text-xs font-bold m-0 rounded-t-lg flex flex-col">
                  {arrivalTime}, {weekday.slice(0, 3)} {month} {day} {longYear}
                </p>
                <p className="text-gray-600 text-sm font-medium flex flex-col">
                  {from}
                </p>
              </div>
            </div>
            <div className="h-[120px] w-1/2 mr-[15px] rounded-[12px] border border-[#cecece] flex flex-col">
              <p className="py-2 px-3 bg-gray-200 font-black text-xs uppercase text-gray-700 m-0 rounded-t-lg flex flex-col">
                Dropping Point
              </p>
              <div className="p-4 flex flex-col gap-2">
                <p className="text-[#757575] text-xs font-bold m-0 rounded-t-lg flex flex-col">
                  {departureTime}, {format(departureDate, 'EEE')}{' '}
                  {format(departureDate, 'MMM')} {format(departureDate, 'dd')}{' '}
                  {format(departureDate, 'yyyy')}
                </p>
                <p className="text-gray-600 text-sm font-medium flex flex-col">
                  {to}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start border-t border-gray-300">
          {seatsList.length > 0 && (
            <>
              <div className="flex flex-col gap-4">
                <p className="mb-[10px] text-[#4a4a4a] font-semibold text-base">
                  Selected Seats:
                  <div className="flex flex-wrap">
                    {seatsList.map((item, index) => (
                      <span key={index} className="pr-1">
                        {item}
                        {index + 1 === seatsList.length ? '' : ','}
                      </span>
                    ))}
                  </div>
                </p>
                <p className="text-[#4a4a4a] font-semibold text-base">
                  No. of seats selected : {seatsList.length}
                </p>
                <p className="text-[#4a4a4a] font-semibold text-base">
                  ₹ {finalPrice}
                </p>
              </div>
              <button
                className="cursor-pointer rounded-lg shadow-[0_1px_7px_rgba(0,0,0,0.21)] bg-gradient-to-r from-[#53b2fe] to-[#065af3] px-6 py-3 mt-2 w-full flex items-center justify-center text-lg text-white font-extrabold border-none"
                onClick={handleNavigateBooking}
              >
                CONTINUE
              </button>
            </>
          )}
          {seatsList.length === 0 && (
            <p className="text-[#757575] text-sm font-medium mt-4">
              Please select seats to continue.
            </p>
          )}
        </div>
      </div>
      <Modal open={openModal} close={() => setOpenModal(false)}>
        <Login close={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}

export default SelectSeat;
