import { createContext, useContext, useState } from 'react';
import { getOffersByFilter } from '../../services/apiOffers';

const OffersContext = createContext();

function OffersProvider({ children }) {
  const [clickedValue, setClickedValue] = useState('ALL');

  function handleClick(option) {
    setClickedValue(option);
    getOffersByFilter(option);
  }

  const content = { clickedValue, setClickedValue, handleClick };

  return (
    <OffersContext.Provider value={content}>{children}</OffersContext.Provider>
  );
}

function useOffersContext() {
  const context = useContext(OffersContext);
  if (context === undefined)
    throw new Error('OffersContext was used outside of OffersProvider');
  return context;
}

export { OffersProvider, useOffersContext };
