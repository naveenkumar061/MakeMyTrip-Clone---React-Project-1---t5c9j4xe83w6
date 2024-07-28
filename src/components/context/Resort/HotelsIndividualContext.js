import { createContext, useContext } from 'react';
import { useHotelsLocation } from '../../features/hotels/hotelsapicalls/useHotelsLocation';

const HotelsIndividualContext = createContext();

function HotelsIndividualProvider({ children }) {
  const {
    isLoading: hotelsLocationsLoading,
    hotelsLocation,
    error: hotelsLocationsError,
  } = useHotelsLocation();

  return (
    <HotelsIndividualContext.Provider
      value={{ hotelsLocationsLoading, hotelsLocation, hotelsLocationsError }}
    >
      {children}
    </HotelsIndividualContext.Provider>
  );
}

function useHotelsIndividualContext() {
  const context = useContext(HotelsIndividualContext);
  if (context === undefined)
    throw new Error(
      'HotelsIndividualContext was used outside of HotelsIndividualProvider'
    );
  return context;
}

export { HotelsIndividualProvider, useHotelsIndividualContext };
