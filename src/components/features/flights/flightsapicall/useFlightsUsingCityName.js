// Third-party library imports
import { useQuery } from '@tanstack/react-query';

// Custom service and context imports
import { useFlightsMainContext } from '../../../context/Flights/FlightsMainContext';
import { getFlightsListUsingCityName } from '../../../services/apiFlights';

// Custom hook to fetch flights using city name
export function useFlightsUsingCityName() {
  // Extract cityName from the FlightsMainContext
  const { cityName } = useFlightsMainContext();

  // Use the useQuery hook from react-query to fetch flights data based on city name
  const { isLoading, data: flightsByFilter } = useQuery({
    queryKey: ['flightsByFilter', cityName],
    queryFn: () => getFlightsListUsingCityName(cityName),
  });

  // Return loading state and fetched flights data
  return { isLoading, flightsByFilter };
}
