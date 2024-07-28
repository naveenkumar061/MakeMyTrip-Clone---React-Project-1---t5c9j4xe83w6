// Importing React dependencies and third-party libraries
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

// Importing custom components
import FilterGroup from "../flightsfilter/FilterGroup";

// Main function component definition for FlightsFilter
function FlightsFilter({
  fromCurrentCity,
  lowestFlightPrice,
  highestFlightPrice,
  filterItems,
  onAddFilter,
  flightList,
  setMaximumPrice,
  maximumPrice,
}) {
  // Function to find the minimum price for a specific property and value
  function minPrice(list, property, value) {
    if (!list) return 0;
    const filteredFlights = list.filter((flight) => flight[property] === value);
    if (!filteredFlights.length) return 0;
    const price = Math.min(
      ...filteredFlights.map((flight) => flight.ticketPrice),
    );
    return price;
  }

  // Calculate the lowest prices for different criteria
  const lowestNonStopPrice = minPrice(flightList, "stops", 0);
  const lowestSingleStopPrice = minPrice(flightList, "stops", 1);

  const lowestIndigoFlightPrice = minPrice(
    flightList,
    "aircraftModel",
    "65144571e16702a399cea7fa",
  );
  const lowestVistaraFlightPrice = minPrice(
    flightList,
    "aircraftModel",
    "65144571e16702a399cea7fc",
  );
  const lowestAirIndiaFlightPrice = minPrice(
    flightList,
    "aircraftModel",
    "65144571e16702a399cea7f8",
  );
  const lowestSpiceJetFlightPrice = minPrice(
    flightList,
    "aircraftModel",
    "65144571e16702a399cea7f9",
  );
  const lowestAkasaAirFlightPrice = minPrice(
    flightList,
    "aircraftModel",
    "65144571e16702a399cea7f7",
  );
  const lowestAirIndiaExpressFlightPrice = minPrice(
    flightList,
    "aircraftModel",
    "65144571e16702a399cea7fb",
  );

  // Defining filter options for various categories
  const popularFilters = [
    { name: "Non Stop", price: lowestNonStopPrice },
    { icon: 3, name: "IndiGo Airline", price: lowestIndigoFlightPrice },
    { icon: 1, name: "Air India Airline", price: lowestAirIndiaFlightPrice },
    { name: "1 Stop", price: lowestSingleStopPrice },
  ];

  const stopsFromSorce = [
    { name: "Non Stop", price: lowestNonStopPrice },
    { name: "1 Stop", price: lowestSingleStopPrice },
  ];

  const airlines = [
    { icon: 0, name: "Akasa Air Airline", price: lowestAkasaAirFlightPrice },
    { icon: 1, name: "Air India Airline", price: lowestAirIndiaFlightPrice },
    { icon: 2, name: "SpiceJet Airline", price: lowestSpiceJetFlightPrice },
    { icon: 3, name: "IndiGo Airline", price: lowestIndigoFlightPrice },
    {
      icon: 4,
      name: "Air India Express Airline",
      price: lowestAirIndiaExpressFlightPrice,
    },
    { icon: 5, name: "Vistara Airline", price: lowestVistaraFlightPrice },
  ];

  // Handler for price range change
  function handlePriceRange(e) {
    const newPrice = Number(e.target.value);
    setMaximumPrice(newPrice);
    onAddFilter("changed", true);
    toast.dismiss();
    toast.success(`Flights Info ₹ ${lowestFlightPrice} - ₹ ${newPrice}`, {
      style: {
        position: "relative",
        top: "57.5px",
      },
    });
  }

  let filterOptions = filterItems.filter((item) => !item.includes("changed"));

  // Handlers for removing filters
  function handleRemoveItem(item) {
    onAddFilter(item, false);
  }
  function handleRemoveAllFilters() {
    filterOptions.map((item) => onAddFilter(item, false));
  }

  // Rendering the filter component
  return (
    <div
      className={`relative bottom-24 z-[1] h-fit w-[20vw] bg-white p-4 shadow-lg`}
    >
      {filterOptions.length > 0 && (
        <>
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Applied Filters</h3>
            <p
              className="cursor-pointer text-blue-500 hover:text-red-500"
              onClick={handleRemoveAllFilters}
            >
              Clear All
            </p>
          </div>
          <div className="inline p-2">
            {filterOptions.map((item, index) => (
              <div
                className="mb-4 flex items-center justify-between rounded-md bg-blue-200 p-2 text-sm"
                key={index}
              >
                <p>{item}</p>
                <IoMdClose
                  className="cursor-pointer text-lg text-blue-500 hover:text-red-500"
                  onClick={() => handleRemoveItem(item)}
                />
              </div>
            ))}
          </div>
        </>
      )}
      <div className="pb-8">
        <h1 className="pb-2 text-lg font-semibold">Popular Filters</h1>
        <FilterGroup
          filters={popularFilters}
          filterItems={filterItems}
          onAddFilter={onAddFilter}
        />
      </div>
      <div className="pb-8">
        <h1 className="pb-2 text-lg font-semibold">One Way Price</h1>
        <input
          key={highestFlightPrice}
          type="range"
          className="w-full"
          min={lowestFlightPrice}
          max={highestFlightPrice}
          defaultValue={!maximumPrice ? highestFlightPrice : maximumPrice}
          onChange={handlePriceRange}
        />
        <div className="flex justify-between">
          <div>₹ {lowestFlightPrice}</div>
          <div className="text-gray-500">
            ₹ {!maximumPrice ? highestFlightPrice : maximumPrice}
          </div>
          <div>₹ {highestFlightPrice}</div>
        </div>
      </div>
      <div className="pb-8">
        <h1 className="pb-2 text-lg font-semibold">
          Stops From {fromCurrentCity}
        </h1>
        <FilterGroup
          filters={stopsFromSorce}
          filterItems={filterItems}
          onAddFilter={onAddFilter}
        />
      </div>
      <div>
        <h1 className="pb-2 text-lg font-semibold">Airlines</h1>
        <FilterGroup
          filters={airlines}
          filterItems={filterItems}
          onAddFilter={onAddFilter}
        />
      </div>
    </div>
  );
}

export default FlightsFilter;
