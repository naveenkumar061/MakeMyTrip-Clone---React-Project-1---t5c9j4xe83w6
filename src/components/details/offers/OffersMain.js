// Importing third-party libraries
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Importing context and data hooks
import { useOffers } from "./useOffers";
import { useOfferByFilter } from "./useOffersByFilter";

// Importing UI components
import Spinner from "../../ui/Spinner";
import OfferItem from "./OfferItem";
import Filter from "./Filter";

// Importing React hooks
import { useEffect, useRef, useState } from "react";

function OffersMain() {
  // Fetching offers data using custom hooks
  const { offers } = useOffers();
  const { offerByFilter, isLoading } = useOfferByFilter();

  // State variables to manage scroll index and maximum index for pagination
  const [scrollIndex, setScrollIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  // Ref for the scroll container
  const scrollContainerRef = useRef(null);

  // Effect to update maxIndex based on the number of filtered offers
  useEffect(() => {
    if (offerByFilter?.data.offers) {
      setMaxIndex(Math.ceil(offerByFilter.data.offers.length / 4) - 1);
    }
  }, [offerByFilter]);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollIndex < maxIndex) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  // Handle filter change and reset scroll index
  const handleFilterChange = () => {
    setScrollIndex(0);
  };

  // Show spinner while loading data
  if (isLoading) return <Spinner />;

  // Extract and deduplicate offer types for filter options
  const allTypes = offers?.data.offers.map((offer) => offer.type);
  const uniqueTypes = [...new Set(allTypes)].sort();
  const typesObject = uniqueTypes.map((type) => ({
    type,
    label: type,
  }));

  // Determine the visible offers based on the current scroll index
  const startIndex = scrollIndex * 4;
  const endIndex = startIndex + 4;
  const visibleOffers = offerByFilter?.data.offers.slice(startIndex, endIndex);

  return (
    <div className="m-12 rounded-md bg-white p-8">
      <div className="max-800:gap-8 flex items-center justify-between">
        <div className="max-650:flex-col flex items-center justify-center gap-4">
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

export default OffersMain;
