// External Libraries
import { useQuery } from '@tanstack/react-query';
import { getFlightsInDetailed } from '../../../services/apiFlights';

// Custom Hook to fetch detailed flight information
export function useFlightInDetailed(flightID) {
  // Destructure the response from useQuery hook
  const {
    isLoading, // Indicates if the data is still loading
    data: flightInDetailed, // The detailed flight information fetched
    error, // Any error encountered during the fetch
  } = useQuery({
    queryKey: ['flightInDetailed', flightID], // Unique key for caching and refetching
    queryFn: () => getFlightsInDetailed(flightID), // Function to fetch detailed flight info
    enabled: !!flightID, // Only run the query if flightID is provided
  });

  // Return the query result
  return { isLoading, flightInDetailed, error };
}
