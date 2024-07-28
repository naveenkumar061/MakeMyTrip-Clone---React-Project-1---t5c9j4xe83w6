// Import statements
import { useQuery } from '@tanstack/react-query';
import { getFlightSortFilter } from '../../../services/apiFlights';

// Custom hook to fetch and sort/filter flight data
export function useFlightsSortFilter(
  source,
  destination,
  day,
  sortValue,
  filterOptions,
  minPrice,
  maxPrice
) {
  // Use the useQuery hook from react-query to fetch flight data
  const {
    isLoading, // Boolean indicating if the query is in a loading state
    data: flightsFilterSort, // Data returned from the query, renamed to flightsFilterSort
    error, // Error object if the query fails
  } = useQuery({
    queryKey: [
      'flightsFilterSort', // Unique query key
      source,
      destination,
      day,
      sortValue,
      filterOptions,
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getFlightSortFilter(
        source,
        destination,
        day,
        sortValue,
        filterOptions,
        minPrice,
        maxPrice
      ),
    enabled: !!source && !!destination && !!day, // Enable the query only if source, destination, and day are provided
  });

  // Return the query states
  return { isLoading, flightsFilterSort, error };
}
