// Importing dependencies from third-party libraries
import { useQuery } from '@tanstack/react-query';

// Importing local API service function
import { getFlightSortByPrice } from '../../../services/apiFlights';

// Custom hook to fetch flights sorted by price
export function useFlightUsingSortForPrice(source, destination, day) {
  const {
    isLoading, // Loading state
    data: flightsByUsingSortForPrice, // Data containing sorted flights
    error, // Error state
  } = useQuery({
    queryKey: ['flightsByUsingSortForPrice', source, destination, day], // Query key based on input parameters
    queryFn: () => getFlightSortByPrice(source, destination, day), // Query function fetching the data
    enabled: !!source && !!destination && !!day, // Conditionally enable the query
  });

  // Returning the query result states
  return { isLoading, flightsByUsingSortForPrice, error };
}
