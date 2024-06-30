// Library imports
import { createContext, useContext, useState } from "react";

// Data fetching function
import { getOffersByFilter } from "../../Services/apiOffers";

// Create context for Offers Insight
const OffersInsightContext = createContext();

// Provider component for Offers Insight
function OffersInsightProvider({ children }) {
  const [clickedValue, setClickedValue] = useState("ALL");

  // Function to handle click and fetch offers based on filter
  function handleClick(option) {
    setClickedValue(option);
    getOffersByFilter(option);
  }

  return (
    <OffersInsightContext.Provider
      value={{ clickedValue, setClickedValue, handleClick }}
    >
      {children}
    </OffersInsightContext.Provider>
  );
}

// Custom hook to use Offers Insight context
function useOffersInsightContext() {
  const context = useContext(OffersInsightContext);
  if (context === undefined)
    throw new Error(
      "OffersInsightContext was used outside of OffersInsightProvider",
    );
  return context;
}

export { OffersInsightProvider, useOffersInsightContext };
