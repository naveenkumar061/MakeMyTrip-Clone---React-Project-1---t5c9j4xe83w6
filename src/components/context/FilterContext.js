// Importing necessary modules and components
import { createContext, useContext, useState } from "react"; // React core libraries

// API service to fetch offers based on filter
import { getOffersByFilter } from "../services/apiOffers";

// Creating a context for the filter
const FilterContext = createContext();

// Provider component to manage filter state and provide context to children components
function FilterProvider({ children }) {
  // State to keep track of the selected filter option
  const [clickedValue, setClickedValue] = useState("ALL");

  // Function to handle click events and update the state and fetch filtered offers
  function handleClick(option) {
    setClickedValue(option);
    getOffersByFilter(option);
  }

  return (
    // Providing context value to child components
    <FilterContext.Provider value={{ clickedValue, handleClick }}>
      {children}
    </FilterContext.Provider>
  );
}

// Custom hook to use filter options context
function useFilterOptions() {
  const context = useContext(FilterContext);
  // Error handling if the hook is used outside the provider
  if (context === undefined)
    throw new Error("FilterContext was used outside of FilterProvider");
  return context;
}

// Exporting the provider and custom hook for use in other components
export { FilterProvider, useFilterOptions };
