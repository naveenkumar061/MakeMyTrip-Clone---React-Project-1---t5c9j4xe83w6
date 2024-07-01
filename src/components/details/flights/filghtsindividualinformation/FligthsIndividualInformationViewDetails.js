import React from "react";
import { Link } from "react-router-dom";
import { useFlightsMainContext } from "../../../context/Flights/FlightsMainContext";

// Component to display detailed information of an individual flight
function FligthsIndividualInformationViewDetails({ flightInDetailed }) {
  // Destructuring values from context
  const {
    fromCity,
    fromCountry,
    toCity,
    toCountry,
    longYear,
    weekday,
    month,
    day,
    airlineInfo,
    travelDuration,
    stops,
    prices,
    seatsAvailable,
    imageName,
    imageSource,
  } = useFlightsMainContext();

  // Destructuring flight details from the passed prop
  const flightDetails = flightInDetailed.data;

  // Fetching specific information using functions from the context
  const airlineList = airlineInfo(flightDetails);
  const duration = travelDuration(flightDetails);
  const stop = stops(flightDetails);
  const price = prices(flightDetails);
  const seats = seatsAvailable(flightDetails);
  const imgName = imageName(airlineList);
  const imgSrc = imageSource(imgName);

  console.log(flightDetails);

  return (
    <div className="flex w-full flex-col flex-wrap justify-between rounded-md border border-gray-400 font-semibold">
      {/* Flight Header with Airline Logo and ID */}
      <div className="flex gap-2 border-b border-slate-300 p-4">
        <img src={imgSrc} alt={imgName} className="h-8 w-8 rounded-sm" />
        <p className="pt-2">{airlineList.name}</p>
        <p className="rounded-full border border-black px-1 pt-2">
          {flightDetails.flightID}
        </p>
      </div>

      {/* Flight Details Section */}
      <div className="flex items-start justify-between border-b border-slate-300 p-4">
        {/* Departure Information */}
        <div className="flex flex-col items-start justify-start">
          <p className="text-base font-semibold">
            {flightDetails.departureTime}
          </p>
          <p className="text-sm font-semibold">
            {weekday.slice(0, 3)}, {month} {day}, {longYear}
          </p>
          <p className="text-sm font-normal">
            {fromCity}, {fromCountry}
          </p>
        </div>

        {/* Travel Duration and Stops */}
        <div className="text-center">
          <p>{duration}</p>
          <div className="flex items-center justify-center">
            <p className="h-[2px] w-[50px] bg-orange-500"></p>
            <p className="m-1 h-[7.5px] w-[7.5px] rounded-full bg-gray-500 font-semibold"></p>
            <p className="h-[2px] w-[50px] bg-orange-500"></p>
          </div>
          <p>{stop}</p>
        </div>

        {/* Arrival Information */}
        <div className="flex flex-col items-start justify-start">
          <p className="text-base font-semibold">{flightDetails.arrivalTime}</p>
          <p className="text-sm font-semibold">
            {weekday.slice(0, 3)}, {month} {day}, {longYear}
          </p>
          <p className="text-sm font-normal">
            {toCity}, {toCountry}
          </p>
        </div>

        {/* Additional Flight Information */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-base font-semibold uppercase">Cabin Bag</p>
          <p className="text-base font-normal">7kgs / Adult</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-base font-semibold uppercase">Check In</p>
          <p className="text-base font-normal">20kgs / Adult</p>
        </div>
        <div className="flex w-[15%] flex-col items-center justify-center">
          <p className="text-base font-semibold uppercase">Cancellation</p>
          <p className="text-center text-base font-normal">
            Cancellation Fee Starting ₹ 500
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-base font-semibold uppercase">Seat Left</p>
          <p className="text-base font-normal">{seats}</p>
        </div>
      </div>

      {/* Flight Price */}
      <p className="pr-4 pt-4 text-right text-lg font-bold">{price}</p>

      {/* Booking Link */}
      <div className="flex justify-end">
        <Link
          to="/booking"
          className="text-md relative right-2 top-2 flex items-center justify-center rounded-[35px] bg-gradient-to-r from-[#53b2fe] to-[#065af3] p-2 font-bold uppercase text-white"
        >
          Book Now
        </Link>
      </div>

      {/* Flight Amenities */}
      <div className="p-2 text-center text-base">{flightDetails.amenities}</div>
    </div>
  );
}

export default FligthsIndividualInformationViewDetails;
