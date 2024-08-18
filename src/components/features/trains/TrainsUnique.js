import { useState } from 'react';
import Modal from '../../utils/Modal';
import Login from '../../pages/Login';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../context/login/LoginContext';

function TrainsUnique({ train }) {
  console.log(train);
  const {
    trainName,
    trainType,
    coaches,
    departureTime,
    arrivalTime,
    travelDuration,
    source,
    destination,
    trainNumber,
    daysOfOperation,
    fare,
    _id,
  } = train;

  const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [openModal, setOpenModal] = useState(false);

  const { isAuthenticated } = useLoginContext();

  const navigate = useNavigate();

  function handleNavigateBooking(val1, val2) {
    if (isAuthenticated) {
      const searchParams = new URLSearchParams();
      searchParams.append('trainId', _id);
      searchParams.append('trainName', trainName);
      searchParams.append('trainNumber', trainNumber);
      searchParams.append('travelDuration', travelDuration);
      searchParams.append('source', source);
      searchParams.append('destination', destination);
      searchParams.append('arrivalTime', arrivalTime);
      searchParams.append('departureTime', departureTime);
      searchParams.append('fare', fare);
      searchParams.append('coachtype', val1);
      searchParams.append('noOfSeats', val2);
      navigate({
        pathname: '/railways/results/booking',
        search: `?${searchParams.toString()}`,
      });
    } else {
      setOpenModal(true);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 bg-white p-7 text-xs border border-[hsla(0, 0%, 50%, .41)] rounded-md shadow-[2px_2px_10px_#d3d3d3] h-72">
      <div className="self-end">{trainType}</div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-2xl">{trainName}</p>
          <div className="flex gap-2 mt-2 items-center justify-center">
            <p className="text-[hsla(0,0%,50%,.677)] text-sm">#{trainNumber}</p>
            <p>|</p>
            <div className="text-sm flex gap-1 items-center justify-center">
              Departs on :
              <div className="flex gap-1">
                {weekDay.map((day, index) => (
                  <div
                    key={index}
                    className={`${
                      daysOfOperation.find((dayOps) => dayOps === day)
                        ? 'text-[#26b5a9]'
                        : ''
                    }`}
                  >
                    {day.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-14 mr-28">
          <div>
            <p className="font-bold text-lg">{departureTime}</p>
            <p className="text-base">{source}</p>
          </div>
          <div className="text-[hsla(0,0%,50%,.677)] font-medium mt-4 text-base">
            - {travelDuration} -
          </div>
          <div>
            <p className="font-bold text-lg">{arrivalTime}</p>
            <p className="text-base">{destination}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4 whitespace-nowrap text-ellipsis overflow-x-auto h-fit scrollbar-thin">
        {coaches.map((coach, index) => (
          <div
            className="flex flex-col rounded-md gap-2 h-24 mt-4 cursor-pointer w-52 min-w-[12rem] border p-2 shadow-[2px_2px_10px_#d3d3d3]"
            key={index}
            onClick={() =>
              handleNavigateBooking(coach.coachType, coach.numberOfSeats)
            }
          >
            <div className="flex justify-between items-center">
              <p className="font-bold text-base">{coach.coachType}</p>
              <p className="font-bold text-sm">₹ {fare}</p>
            </div>
            <div className="text-[#26b5a9]">
              AVAILABLE {coach.numberOfSeats}
            </div>
            <div className="text-sm">Free Cancellation</div>
          </div>
        ))}
      </div>
      <Modal open={openModal} close={() => setOpenModal(false)}>
        <Login close={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}

export default TrainsUnique;
