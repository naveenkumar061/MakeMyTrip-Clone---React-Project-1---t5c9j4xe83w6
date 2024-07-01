// Import third-party libraries
import React, { useEffect, useState } from "react";

// Import context
import { useFlightsMainContext } from "../../../context/Flights/FlightsMainContext";

// Import components
import Spinner from "../../../ui/Spinner";

// Component definition
function FlightsSort({ isLoading, minimumDuration, lowestFlightPrice }) {
  const { setSortValue } = useFlightsMainContext();

  // State variables for sorting options
  const [cheap, setCheap] = useState(true);
  const [fast, setFast] = useState(false);
  const [popular, setPopular] = useState(false);

  // Effect to set default sorting when component mounts or context changes
  useEffect(() => {
    setCheap(true);
    setFast(false);
    setPopular(false);
    setSortValue("price");
  }, [setSortValue]);

  // Handler functions for sorting options
  function handleCheap() {
    setCheap(true);
    setFast(false);
    setPopular(false);
    setSortValue("price");
  }

  function handleFast() {
    setCheap(false);
    setFast(true);
    setPopular(false);
    setSortValue("stops");
  }

  function handlePopular() {
    setCheap(false);
    setFast(false);
    setPopular(true);
    setSortValue("departureTime");
  }

  // Console log for debugging (if necessary)
  console.log(minimumDuration, lowestFlightPrice);

  // Render component JSX
  return (
    <div className="relative bottom-28 flex h-[150px] w-[60vw] items-center justify-between bg-white p-16">
      <div
        className={
          cheap
            ? "flex cursor-pointer items-center gap-4 rounded-md border-b-4 border-blue-500 bg-blue-100 p-4"
            : "flex cursor-pointer items-center gap-4 rounded-md bg-gray-100 p-4"
        }
        onClick={handleCheap}
      >
        <img
          alt="cheap"
          src={require("../../../data/Images/FlightsSorted/Cheapest.png")}
          className="h-10 bg-gray-300"
        />
        <div>
          <h3 className="text-lg font-semibold uppercase">cheapest</h3>
          <div>
            {isLoading && <Spinner addOuterClass="addOuterClass" />}
            {!isLoading && `₹ ${lowestFlightPrice} | ${minimumDuration} hr`}
          </div>
        </div>
      </div>
      <div
        className={
          fast
            ? "flex cursor-pointer items-center gap-4 rounded-md border-b-4 border-blue-500 bg-blue-100 p-4"
            : "flex cursor-pointer items-center gap-4 rounded-md bg-gray-100 p-4"
        }
        onClick={handleFast}
      >
        <img
          alt="fast"
          src={require("../../../data/Images/FlightsSorted/Fastest.png")}
          className="h-10 bg-gray-300"
        />
        <div>
          <h3 className="text-lg font-semibold uppercase">non stop first</h3>
          <div>
            {isLoading && <Spinner addOuterClass="addOuterClass" />}
            {!isLoading && `₹ ${lowestFlightPrice} | ${minimumDuration} hr`}
          </div>
        </div>
      </div>
      <div
        className={
          popular
            ? "flex cursor-pointer items-center gap-4 rounded-md border-b-4 border-blue-500 bg-blue-100 p-4"
            : "flex cursor-pointer items-center gap-4 rounded-md bg-gray-100 p-4"
        }
        onClick={handlePopular}
      >
        <img
          alt="popular"
          src={require("../../../data/Images/FlightsSorted/Popular.png")}
          className="h-10 bg-gray-300"
        />
        <div>
          <h3 className="text-lg font-semibold uppercase">you may prefer</h3>
          <div>
            {isLoading && <Spinner addOuterClass="addOuterClass" />}
            {!isLoading && `₹ ${lowestFlightPrice} | ${minimumDuration} hr`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightsSort;
