// Import Statements
// Third-party libraries
import { useQuery } from "@tanstack/react-query";

// Services or API calls
import { getOffers } from "../../services/apiOffers";

// Custom Hook: useOffers
// This custom hook uses the `useQuery` hook from `@tanstack/react-query` to fetch offer data from the API.
// The `getOffers` function is passed as the query function to fetch the offers.
// The hook returns the loading state (`isLoading`) and the fetched offers data (`offers`).

export function useOffers() {
  // Using the `useQuery` hook to fetch offers data.
  // queryKey: ["offerList"] - Unique key to identify this query.
  // queryFn: getOffers - Function that fetches the data.
  const { isLoading, data: offers } = useQuery({
    queryKey: ["offerList"],
    queryFn: getOffers,
  });

  // Return the loading state and the fetched offers data.
  return { isLoading, offers };
}
