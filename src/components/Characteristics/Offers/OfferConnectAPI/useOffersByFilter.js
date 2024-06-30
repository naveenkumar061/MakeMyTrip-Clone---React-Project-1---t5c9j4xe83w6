// Import statements organized by libraries, components, context, data
import { useQuery } from "@tanstack/react-query";
import { useOffersInsightContext } from "../../../WebDevGuru/Offers/OffersInsightContext";
import { getOffersByFilter } from "../../../Services/apiOffers";

// Custom hook to fetch offers based on filter type
export function useOfferByFilter() {
  // Retrieve the clicked value (filter type) from context
  const { clickedValue: type } = useOffersInsightContext();

  // Fetch offers based on filter type using react-query
  const { isLoading, data: offerByFilter } = useQuery({
    queryKey: ["offerByFilter", type],
    queryFn: () => getOffersByFilter(type),
  });

  // Return loading state and fetched offers
  return { isLoading, offerByFilter };
}
