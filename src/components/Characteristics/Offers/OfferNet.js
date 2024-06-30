// Libraries
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import Spinner from "../../UIManager/Spinner";
import Filter from "./Filter";
import OfferItem from "./OfferItem";

// API
import { useOffers } from "./OfferConnectAPI/useOffers";
import { useOfferByFilter } from "./OfferConnectAPI/useOffersByFilter";

function OfferNet() {
  const { offers } = useOffers();
  const { offerByFilter, isLoading } = useOfferByFilter();

  const [scrollIndex, setScrollIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Update maxIndex when offerByFilter data changes
  useEffect(() => {
    if (offerByFilter?.data.offers) {
      setMaxIndex(Math.ceil(offerByFilter.data.offers.length / 4) - 1);
    }
  }, [offerByFilter]);

  const scrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const scrollRight = () => {
    if (scrollIndex < maxIndex) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  // Reset scroll index when filter changes
  const handleFilterChange = () => {
    setScrollIndex(0);
  };

  if (isLoading) return <Spinner />;

  // Extract and sort unique offer types
  const allTypes = offers?.data.offers.map((offer) => offer.type);
  const uniqueTypes = [...new Set(allTypes)].sort();
  const typesObject = uniqueTypes.map((type) => ({
    type,
    label: type,
  }));

  // Determine the range of offers to display
  const startIndex = scrollIndex * 4;
  const endIndex = startIndex + 4;
  const visibleOffers = offerByFilter?.data.offers.slice(startIndex, endIndex);

  return (
    <div className="m-12 rounded-md bg-white p-8">
      <div className="flex items-center justify-between max-800:gap-8">
        <div className="flex items-center justify-center gap-4 max-650:flex-col">
          <h1 className="text-3xl font-bold">Offers</h1>
          <Filter options={typesObject} onChange={handleFilterChange} />
        </div>
        <div className="max-650:flex max-550:flex-col">
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
  );
}

export default OfferNet;
