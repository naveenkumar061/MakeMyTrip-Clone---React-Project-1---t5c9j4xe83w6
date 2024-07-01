// External library imports
import { useQuery } from "@tanstack/react-query";

// Internal imports
import { getFlightsList } from "../../../servenow/apiFlights";

// Custom hook to fetch flights list
export function useFlightsList() {
  // Using react-query to fetch the list of flights
  const { isLoading, data: flights } = useQuery({
    queryKey: ["flightList"], // Unique key for this query
    queryFn: getFlightsList, // Function that fetches the flight data
  });

  // Returning loading state and fetched flight data
  return { isLoading, flights };
}
