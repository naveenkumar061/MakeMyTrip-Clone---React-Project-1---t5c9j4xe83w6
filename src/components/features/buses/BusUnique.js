import { useState, useEffect } from 'react';
import SelectSeat from './SelectSeat';
import Bus from '../../assets/images/bus.png';
import { useBusesMainContext } from '../../context/Buses/BusesMainContext';
import { addDays } from 'date-fns';

function BusUnique({ item }) {
  const { date } = useBusesMainContext();
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [hideSeat, setHideSeat] = useState(false);
  const [departureDate, setDepartureDate] = useState(date);
  const [travelDuration, setTravelDuration] = useState('');

  const { name, fare, arrivalTime, departureTime, type, seats, amenities } =
    item;

  function handleSelectSeats() {
    setHideSeat((seat) => !seat);
  }

  useEffect(() => {
    function timeToMinutes(time) {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    }

    function calculateDuration(arrivalTime, departureTime) {
      console.log(arrivalTime);
      console.log(departureTime);
      const arrivalMinutes = timeToMinutes(arrivalTime);
      const departureMinutes = timeToMinutes(departureTime);

      if (departureTime < arrivalTime) {
        const arrive = 24 * 60 - arrivalMinutes;
        console.log('arrive', arrive);
        return arrive + departureMinutes;
      } else return departureMinutes - arrivalMinutes;
    }

    function formatDuration(minutes) {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hrs} hrs ${mins} mins`;
    }

    function adjustDepartureTime(arrivalTime, departureTime) {
      if (departureTime <= arrivalTime) setDepartureDate(addDays(date, 1));
      else setDepartureDate(date);

      const duration = calculateDuration(arrivalTime, departureTime);
      setTravelDuration(formatDuration(duration));
    }

    adjustDepartureTime(arrivalTime, departureTime);
  }, [date, arrivalTime, departureTime]);

  return (
    <div className="bg-white my-4 rounded-2xl border border-[#e7e7e7] py-2 w-full">
      <div className="flex flex-col">
        <div className="px-[25px] py-[15px] flex flex-row justify-between w-full">
          <div className="mr-[50px] mb-[22px] flex flex-col items-start w-[20%]">
            <p className="mr-[15px] mb-[8px] text-base font-bold">{name}</p>
            <p className="text-base text-[#4a4a4a]">{type} Seater</p>
          </div>
          <div className="mb-[20px] flex flex-row">
            <div className="mr-1 font-bold text-lg">
              <span>{arrivalTime}</span>
            </div>
            <div className="w-[29px] h-[1px] mx-2 mt-[13px] mb-[10px] border-t-[1.4px] border-[#e7e7e7]"></div>
            <div>{travelDuration}</div>
            <div className="w-[29px] h-[1px] mx-2 mt-[13px] mb-[10px] border-t-[1.4px] border-[#e7e7e7]"></div>
            <div className="mr-1 font-bold text-lg">
              <span>{departureTime}</span>
            </div>
          </div>
          <div className="ml-[32px] text-xl font-bold">₹ {fare}</div>
        </div>
        <div className="flex justify-between mb-3 px-[25px]">
          <div className="bg-[#1a7970] mt-[4.5px] w-[40px] h-[22px] rounded text-white flex flex-row justify-center items-center">
            <span
              className="bg-no-repeat bg-[length:350px_500px] w-[9px] h-[9px] mr-1 bg-[position:-132px_-56px] z-20"
              style={{
                backgroundImage: `url(${Bus})`,
              }}
            ></span>
            <p>4.9</p>
          </div>
          <p className="p-0 m-0 text-xs">{seats} seats</p>
        </div>
      </div>
      <div className="border-b w-full border-[#dedede]"></div>
      <div className="flex flex-row justify-between items-center px-[23px] py-[10px]">
        <div className="flex-col">
          <div>
            <span
              className="text-xs cursor-pointer mr-4 bg-[#eaf5ff] text-[#008cff] p-1 font-medium rounded"
              onClick={() => setAmenitiesOpen(!amenitiesOpen)}
            >
              Amenities
            </span>
            {amenitiesOpen && (
              <span className="font-bold text-[#757575] text-xs">
                {amenities.map((item, index) => (
                  <span key={index} className="pr-4">
                    {item}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
        {!hideSeat && (
          <button
            className="w-[180px] font-semibold text-sm text-center text-white py-[10px] px-[20px] rounded-lg cursor-pointer bg-[rgb(0,140,255)]"
            onClick={handleSelectSeats}
          >
            SELECT SEAT
          </button>
        )}
        {hideSeat && (
          <button
            className="w-[180px] font-semibold text-sm text-center text-white py-[10px] px-[20px] rounded-lg cursor-pointer bg-[rgb(0,140,255)] uppercase"
            onClick={handleSelectSeats}
          >
            Hide Seat
          </button>
        )}
      </div>
      {hideSeat && (
        <SelectSeat
          departureDate={departureDate}
          item={item}
          travelDuration={travelDuration}
        />
      )}
    </div>
  );
}

export default BusUnique;
