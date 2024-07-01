// Third-party libraries
import { useQuery } from "@tanstack/react-query";

// Data services
import { getOffersByFilter } from "../../servenow/apiOffers";

// Context
import { useFilterOptions } from "../../context/FilterContext";

// Function to fetch offers based on filter
export function useOfferByFilter() {
  // Get filter options from context
  const { clickedValue: type } = useFilterOptions();

  // Use react-query to fetch data
  const { isLoading, data: offerByFilter } = useQuery({
    queryKey: ["offerByFilter", type], // Unique query key for caching purposes
    queryFn: () => getOffersByFilter(type), // Function to fetch offers based on type
  });

  // Return loading state and fetched data
  return { isLoading, offerByFilter };
}
