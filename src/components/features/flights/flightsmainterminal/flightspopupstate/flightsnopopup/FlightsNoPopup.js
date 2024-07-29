// Import React and other necessary libraries
import React from 'react';

// Import context hook for accessing flight data
import { useFlightsMainContext } from '../../../../../context/Flights/FlightsMainContext';

// FlightsNoPopup component definition
function FlightsNoPopup({ destination }) {
  // Destructure flight information from context
  const {
    fromCity,
    fromName,
    fromCountry,
    fromIataCode,
    toCity,
    toName,
    toCountry,
    toIataCode,
  } = useFlightsMainContext();

  // Variables to hold flight information based on the destination
  let city, name, country, iataCode;

  // Set flight information for "from" destination
  if (destination === 'from') {
    city = fromCity;
    name = fromName;
    country = fromCountry;
    iataCode = fromIataCode;
  }

  // Set flight information for "to" destination
  if (destination === 'to') {
    city = toCity;
    name = toName;
    country = toCountry;
    iataCode = toIataCode;
  }

  // Render the flight information
  return (
    <div className="md:w-[450px]">
      <h1 className="overflow-hidden text-ellipsis text-3xl font-bold">
        {city}
      </h1>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap max-1200:hidden">
        {iataCode},{`${name} ${country}`}
      </p>
    </div>
  );
}

export default FlightsNoPopup;
