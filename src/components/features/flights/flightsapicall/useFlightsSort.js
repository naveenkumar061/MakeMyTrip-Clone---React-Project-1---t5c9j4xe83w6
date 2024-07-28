import { useQuery } from '@tanstack/react-query'; // Third-party libraries
import { getFlightSortBySortValue } from '../../../services/apiFlights'; // Context or services

/**
 * Custom hook to fetch sorted flight data
 *
 * @param {string} source - The departure location code
 * @param {string} destination - The arrival location code
 * @param {string} day - The travel date
 * @param {string} sortValue - The value to sort flights by (e.g., price, duration)
 * @returns {object} - An object containing the loading state, sorted flights data, and any error encountered
 */
export function useFlightsSort(source, destination, day, sortValue) {
  const {
    isLoading,
    data: flightsByUsingSort,
    error,
  } = useQuery({
    queryKey: ['flightsByUsingSort', source, destination, day, sortValue],
    queryFn: () =>
      getFlightSortBySortValue(source, destination, day, sortValue),
    enabled: !!source && !!destination && !!day, // Only enable query if source, destination, and day are provided
  });

  return { isLoading, flightsByUsingSort, error }; // Return loading state, sorted flights data, and any error
}
