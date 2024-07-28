import { createContext, useContext, useState } from 'react';
import { useFlightsList } from '../../features/flights/flightsapicall/useFlightList';

const FlightIndividualContext = createContext();

function FlightIndividualProvider({ children }) {
  const { flights } = useFlightsList();

  const airportList = flights?.data.airports;

  const [cityName, setCityName] = useState(null);

  const content = { flights, airportList, cityName, setCityName };

  return (
    <FlightIndividualContext.Provider value={content}>
      {children}
    </FlightIndividualContext.Provider>
  );
}

function useFlightIndividualContext() {
  const context = useContext(FlightIndividualContext);
  if (context === undefined)
    throw new Error(
      'FlightIndividualContext was used outside of FlightIndividualProvider'
    );

  return context;
}

export { FlightIndividualProvider, useFlightIndividualContext };
