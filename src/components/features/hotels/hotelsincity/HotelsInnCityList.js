import { useState } from 'react';
import { CiCircleInfo } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useHotelsMainContext } from '../../../context/Resort/HotelsMainContext';

function HotelsInnCityList({ item }) {
  console.log(item);
  const { _id, location } = item;
  const [isHovered, setIsHovered] = useState(false);
  const { dateCheckIn, dateCheckOut, noOfRooms, noOfAdults } =
    useHotelsMainContext();

  const navigate = useNavigate();
  function clickToSearch(hotelID) {
    console.log(hotelID);
    const searchParams = new URLSearchParams();
    searchParams.append('hotelID', hotelID);
    searchParams.append('location', location);
    searchParams.append('date', dateCheckIn);
    searchParams.append('returndate', dateCheckOut);
    searchParams.append('rooms', noOfRooms);
    searchParams.append('adults', noOfAdults);
    navigate({
      pathname: '/hotels/results/details',
      search: `?${searchParams.toString()}`,
    });
  }

  function hotelperformance(val) {
    if (val >= 4) {
      return 'Excellent';
    }
    if (val >= 2 && val < 4) {
      return 'Very Good';
    }
    if (val < 2) {
      return 'Average';
    }
  }

  return (
    <div
      className="p-4 cursor-pointer hover:border-[#0084ff] h-80 w-full flex border border-gray-200 shadow-md rounded-lg overflow-hidden"
      onClick={() => clickToSearch(_id)}
    >
      <div className="w-3/4 border-r border-gray-400 p-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="h-40 flex gap-4">
            <img
              src={item.images[0]}
              alt="mainImg"
              //   loading="lazy"
              className="w-[180px] h-full object-cover rounded-lg"
            />
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-[rgb(0,128,0)]">10% available discount</p>
              <p className="text-[rgb(0,128,0)]">
                Free Cancellation till Check-in
              </p>
            </div>
          </div>
          <div className="w-[98px] flex flex-col justify-between h-[110px]">
            <div className="text-lg font-bold">
              {item.amenities.length}-star hotel
            </div>
            <div
              className="relative self-end"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CiCircleInfo className="text-3xl" />
              <div
                className={`${
                  isHovered ? 'flex flex-col' : 'hidden'
                } absolute top-full right-0 mt-2 p-2 bg-white border border-gray-200 shadow-lg rounded-lg`}
              >
                {item.amenities.map((amenity, index) => (
                  <div key={index} className="p-1 w-[120px] text-xs">
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <img
            src={item.images[1]}
            alt="subImg"
            // loading="lazy"
            className="w-[50px] h-[50px] object-cover rounded-lg"
          />
          <img
            src={item.images[2]}
            alt="subImg"
            // loading="lazy"
            className="w-[50px] h-[50px] object-cover rounded-lg"
          />
          <img
            src={item.images[3]}
            alt="subImg"
            // loading="lazy"
            className="w-[50px] h-[50px] object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="w-[35%] p-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">{hotelperformance(item.rating)}</h2>
          <p>{item.rating}/5 rating</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <h2>
            <span className="font-bold text-xl">
              ₹{Math.floor(item.avgCostPerNight)} /
            </span>{' '}
            per night
          </h2>
          <p>+₹ {Math.floor((item.avgCostPerNight * 12) / 100)} taxes & fees</p>
        </div>
      </div>
    </div>
  );
}

export default HotelsInnCityList;
