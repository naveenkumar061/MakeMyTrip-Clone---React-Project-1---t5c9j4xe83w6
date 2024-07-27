import { useEffect, useRef, useState } from 'react';
import OFilters from './OFilters';
import { useOffers } from './useOffers';
import { useOfferByFilter } from './useOffersByFilter';
import Spinner from '../../utils/Spinner';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import OfferItem from './OfferItem';

function Offers() {
  const { offers } = useOffers();
  const { offerByFilter, isLoading } = useOfferByFilter();

  const [scrollIndex, setScrollIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (offerByFilter?.data.offers) {
      setMaxIndex(Math.ceil(offerByFilter.data.offers.length / 4) - 1);
    }
  }, [offerByFilter]);

  function scrollLeft() {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  }

  function scrollRight() {
    if (scrollIndex < maxIndex) {
      setScrollIndex(scrollIndex + 1);
    }
  }

  function handleFilterChange() {
    setScrollIndex(0);
  }

  if (isLoading)
    return <Spinner className="h-full flex justify-center items-center" />;

  const allTypes = offers?.data.offers.map((offer) => offer.type);
  const uniqueTypes = [...new Set(allTypes)].sort();
  const typesObject = uniqueTypes.map((type) => ({
    type,
    label: type,
  }));

  const startIndex = scrollIndex * 4;
  const endIndex = startIndex + 4;
  const visibleOffers = offerByFilter?.data.offers.slice(startIndex, endIndex);
  return (
    <div className="h-full bg-gray-100 p-4">
      <div className="m-12 rounded-md bg-white p-8">
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:w-full sm:items-start md:justify-start">
            <h1 className="text-3xl font-bold">Offers</h1>
            <OFilters options={typesObject} onChange={handleFilterChange} />
          </div>
          <div className="md:flex">
            <button
              onClick={scrollLeft}
              disabled={scrollIndex === 0}
              className="z-10 rounded-bl-xl rounded-tl-xl border bg-white p-2 text-blue-500 shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={scrollRight}
              disabled={scrollIndex === maxIndex}
              className="z-10 rounded-r-md rounded-br-xl rounded-tr-xl border bg-white p-2 text-blue-500 shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="flex flex-wrap gap-8 p-4">
          {visibleOffers?.map((item, index) => (
            <OfferItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offers;
