// Importing hooks and utilities from React
import { createContext, useContext, useState } from "react";

// Importing custom hook for fetching flight list data
import { useFlightsList } from "../../details/flights/flightsapicall/useFlightList";

// Creating a new context for FlightIndividual
const FlightIndividualContext = createContext();

// FlightIndividualProvider component to provide context values to its children
function FlightIndividualProvider({ children }) {
  // Fetching flights data using custom hook
  const { flights } = useFlightsList();

  // Extracting airport list from flights data
  const airportList = flights?.data.airports;

  // State to store the selected city name
  const [cityName, setCityName] = useState(null);

  // Providing context values to children components
  return (
    <FlightIndividualContext.Provider
      value={{ flights, airportList, cityName, setCityName }}
    >
      {children}
    </FlightIndividualContext.Provider>
  );
}

// Custom hook to use FlightIndividualContext
function useFlightIndividualContext() {
  // Getting context value
  const context = useContext(FlightIndividualContext);

  // Throwing an error if used outside of FlightIndividualProvider
  if (context === undefined)
    throw new Error(
      "FlightIndividualContext was used outside of FlightIndividualProvider",
    );

  return context;
}

// Exporting the provider and custom hook
export { FlightIndividualProvider, useFlightIndividualContext };
