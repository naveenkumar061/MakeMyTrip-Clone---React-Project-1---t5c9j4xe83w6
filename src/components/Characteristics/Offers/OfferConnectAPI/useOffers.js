import { useQuery } from "@tanstack/react-query"; // Library imports
import { getOffers } from "../../../Services/apiOffers"; // Data-related imports

// Custom hook to fetch and manage offers data
export function useOffers() {
  const { isLoading, data: offers } = useQuery({
    // Query hook to fetch data
    queryKey: ["offerList"], // Unique identifier for the query
    queryFn: getOffers, // Function to fetch offers data
  });

  return { isLoading, offers }; // Return loading state and offers data
}
