import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useFlightsMainContext } from '../../../context/Flights/FlightsMainContext';
import { useFlightInDetailed } from '../flightsapicall/useFlightInDetailed';
import FligthsIndividualInformationViewDetails from './FligthsIndividualInformationViewDetails';
import { useLoginContext } from '../../../context/login/LoginContext';
import Modal from '../../../utils/Modal';
import Login from '../../../pages/Login';

function FlightsindividualInformationList({ index, listLength, flight }) {
  const {
    airlineInfo,
    travelDuration,
    stops,
    prices,
    seatsAvailable,
    imageName,
    imageSource,
    airportList,
    date,
  } = useFlightsMainContext();

  const [searchParams] = useSearchParams();

  const sourceIataCode = searchParams.get('source');
  const destinationIataCode = searchParams.get('destination');

  // Find the source city based on the source IATA code
  const { city: fromCity } =
    airportList?.find((airport) => airport?.iata_code === sourceIataCode) || {};

  // Find the destination city based on the destination IATA code
  const { city: toCity } =
    airportList?.find(
      (airport) => airport?.iata_code === destinationIataCode
    ) || {};

  const { flightInDetailed } = useFlightInDetailed(flight._id);

  const navigate = useNavigate();

  const [hideDetails, setHideDetails] = useState(false);
  const { isAuthenticated } = useLoginContext();

  const airlineList = airlineInfo(flight);
  const duration = travelDuration(flight);
  const stop = stops(flight);
  const price = prices(flight);
  const seats = seatsAvailable(flight);
  const imgName = imageName(airlineList);
  const imgSrc = imageSource(imgName);

  const [openModal, setOpenModal] = useState(false);

  function handleViewFlightDetails() {
    setHideDetails((details) => !details);
  }

  function handleNavigateBooking() {
    if (isAuthenticated) {
      const searchParams = new URLSearchParams();
      searchParams.append('flight_id', flight._id);
      searchParams.append('date', date);
      searchParams.append('fromCity', fromCity);
      searchParams.append('toCity', toCity);
      searchParams.append('duration', duration);
      searchParams.append('airlineListName', airlineList.name);
      searchParams.append('imgSrc', imgSrc);
      searchParams.append('imgName', imgName);
      navigate({
        pathname: '/flights/results/flightBooking',
        search: `?${searchParams.toString()}`,
      });
    } else {
      setOpenModal(true);
    }
  }

  return (
    <div
      className={`${
        index === listLength - 1 ? 'm-0' : 'mb-4'
      } flex w-full flex-col gap-4 bg-white p-4 text-xs`}
    >
      <div className="flex w-full flex-wrap justify-between">
        {/* Airline Logo and Info */}
        <img src={imgSrc} alt={airlineList.name} className="h-8 w-8" />
        <div className="ml-1">
          <p className="font-semibold">{airlineList.name}</p>
          <p className="text-gray-400">{flight.flightID}</p>
        </div>
        {/* Departure Info */}
        <div className="flex flex-col items-start justify-start">
          <p className="text-lg font-bold">{flight.departureTime}</p>
          <p>{fromCity}</p>
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
        {/* Arrival Info */}
        <div className="flex flex-col items-start justify-start">
          <p className="text-lg font-bold">{flight.arrivalTime}</p>
          <p>{toCity}</p>
        </div>
        {/* Price and Seat Availability */}
        <div className="flex flex-col items-start justify-start">
          <p className="text-lg font-bold">{price}</p>
          <p>per adult</p>
        </div>
        {/* Booking Button */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-red-500">{seats}</p>
          <div
            onClick={handleNavigateBooking}
            className="text-md flex items-center justify-center rounded-[35px] bg-gradient-to-r from-[#53b2fe] to-[#065af3] p-2 font-bold uppercase text-white cursor-pointer"
          >
            View Prices
          </div>
        </div>
      </div>
      {/* Toggle Flight Details */}
      {!hideDetails && (
        <p
          className="cursor-pointer text-right text-blue-400"
          onClick={handleViewFlightDetails}
        >
          View Flight Details
        </p>
      )}
      {hideDetails && (
        <>
          <p
            className="cursor-pointer text-right text-blue-400"
            onClick={handleViewFlightDetails}
          >
            Hide Flight Details
          </p>
          <FligthsIndividualInformationViewDetails
            flightInDetailed={flightInDetailed}
            flightID={flight._id}
          />
        </>
      )}
      <Modal open={openModal} close={() => setOpenModal(false)}>
        <Login close={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}

export default FlightsindividualInformationList;
