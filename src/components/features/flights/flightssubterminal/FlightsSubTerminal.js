// Path Imports
import FlightsSubPopup from './flightssubpopupstate/FlightsSubPopup';
import FlightsSubDatePopup from './flightssubdatehandler/FlightsSubDatePopup';
import FlightsSubClassPopup from './flightssubclassstate/FlightsSubClassPopup';
import FlightsIndividualInformation from '../filghtsindividualinformation/FlightsIndividualInformation';
import FlightsSort from '../flightssort/FlightsSort';
import FlightsFilter from '../flightsfilter/FlightsFilter';

// Third-party Library Imports
import { useEffect, useState } from 'react';
import { PiArrowsLeftRightLight } from 'react-icons/pi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// Context Imports
import { useFlightsMainContext } from '../../../context/Flights/FlightsMainContext';
import { useFlightsSortFilter } from '../flightsapicall/useFlightsSortFilter';
import { useFlightUsingSortForPrice } from '../flightsapicall/useFlightsUsingSortForPrice';

// Data Importss
import SpinnerMini from '../../../utils/SpinnerMini';
import { airlineData } from '../../../assets/data/AirlineData';

const commonClass =
  'relative h-14 flex-col gap-2 w-[20%] rounded-md bg-[#ffffff1a] px-4 font-semibold uppercase text-left cursor-pointer items-center justify-center';

function FlightsSubTerminal() {
  // Destructuring values from FlightsMainContext
  const {
    isFromPopupOpen,
    fromIndex,
    setFromIndex,
    fromCity,
    fromCountry,
    fromIataCode,
    fromRef,
    handleFromClick,
    isToPopupOpen,
    toIndex,
    setToIndex,
    toCity,
    toCountry,
    toIataCode,
    toRef,
    handleToClick,
    handleMainArrowButtonClick,
    showToast,
    isFlightsDatePopupOpen,
    setDate,
    longYear,
    weekday,
    month,
    day,
    dateRef,
    handleDeparture,
    isFlightsClassPopupOpen,
    number,
    setNumber,
    classType,
    setClassType,
    classRef,
    handleClass,
    handleClickOutside,
    airportList,
    sortValue,
  } = useFlightsMainContext();

  // Get search parameters from URL
  const [searchParams] = useSearchParams();

  const sourceIataCode = searchParams.get('source');
  const destinationIataCode = searchParams.get('destination');
  const selectedDay = searchParams.get('day');
  const selectedDate = searchParams.get('date');
  const passengerType = searchParams.get('passenger');
  const noOfPassengers = searchParams.get('number');

  const navigate = useNavigate();

  const [filterItems, setFilterItems] = useState([]);
  const [filterAirlines, setFilterAirlines] = useState();
  const [filteredSortedFlights, setFilteredSortedFlights] = useState();

  // Get city names based on IATA codes
  const { city: fromCurrentCity } =
    airportList?.find((airport) => airport?.iata_code === sourceIataCode) || {};

  const { city: toCurrentCity } =
    airportList?.find(
      (airport) => airport?.iata_code === destinationIataCode
    ) || {};

  // Fetch sorted flights based on price
  const { flightsByUsingSortForPrice, isLoading: priceIsLoading } =
    useFlightUsingSortForPrice(
      sourceIataCode,
      destinationIataCode,
      selectedDay.slice(0, 3)
    );

  const lowestFlightPrice =
    flightsByUsingSortForPrice?.data.flights?.at(0).ticketPrice;
  const highestFlightPrice = flightsByUsingSortForPrice?.data.flights?.at(
    flightsByUsingSortForPrice?.data.flights.length - 1
  ).ticketPrice;

  const [maximumPrice, setMaximumPrice] = useState(highestFlightPrice);

  const durationArray = flightsByUsingSortForPrice?.data.flights.map(
    (item) => item.duration
  );

  const minimumDuration = durationArray && Math.min(...durationArray);

  // Fetch filtered and sorted flights
  const { isLoading, flightsFilterSort } = useFlightsSortFilter(
    sourceIataCode,
    destinationIataCode,
    selectedDay.slice(0, 3),
    sortValue,
    filterItems,
    lowestFlightPrice,
    maximumPrice
  );

  console.log(flightsFilterSort);

  // Set initial values based on URL parameters
  useEffect(() => {
    setFromIndex(sourceIataCode);
    setToIndex(destinationIataCode);
    setDate(new Date(selectedDate));
    setClassType(passengerType);
    setNumber(noOfPassengers);
    setMaximumPrice(highestFlightPrice);
  }, [
    sourceIataCode,
    destinationIataCode,
    selectedDate,
    passengerType,
    noOfPassengers,
  ]);

  // Show toast message if source and destination are the same
  useEffect(() => {
    let condition = fromIndex === toIndex;

    showToast(condition);

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      toast.dismiss();
    };
  }, [fromIndex, toIndex, handleClickOutside, showToast]);

  // Update filtered and sorted flights
  useEffect(() => {
    setFilteredSortedFlights(flightsFilterSort?.data.flights);
  }, [flightsFilterSort]);

  // Filter airlines based on selected filter items
  useEffect(() => {
    const airlinesFilterOptions = filterItems.filter((item) =>
      item.includes('Airline')
    );
    setFilterAirlines(airlinesFilterOptions);
  }, [filterItems]);

  // Apply airline filters to the flights
  useEffect(() => {
    let filteredFlights = flightsFilterSort?.data.flights;

    if (filterAirlines?.length) {
      filteredFlights = filteredFlights?.filter((flight) =>
        filterAirlines.some((airline) => {
          const craft = airlineData.filter(
            (line) => line.name === airline.slice(0, airline.length - 8)
          );
          return flight.aircraftModel.includes(craft[0].model);
        })
      );
    }
    setFilteredSortedFlights(filteredFlights);
  }, [flightsFilterSort, filterAirlines]);

  // Scroll to top when filter items or maximum price changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filterItems, maximumPrice, setMaximumPrice]);

  // Handle search button click
  function handleSubSearch() {
    if (fromIndex !== toIndex) {
      const searchParams = new URLSearchParams();
      searchParams.set('source', fromIataCode);
      searchParams.set('destination', toIataCode);
      searchParams.set('day', weekday);
      searchParams.set('date', `${month}/${day}/${longYear}`);
      searchParams.set('passenger', classType);
      searchParams.set('number', number);
      navigate({
        pathname: '/flights/search',
        search: `?${searchParams.toString()}`,
      });
    } else {
      toast.dismiss();
      toast.error(
        'Cannot proceed further until the source and destination are different. Please correct it.',
        {
          style: { border: '1px solid black' },
        }
      );
    }
  }

  // Add or remove filters based on the condition
  function onAddFilter(filter, condition) {
    if (condition)
      setFilterItems((prev) =>
        prev.includes(filter) ? prev : [...prev, filter]
      );
    else setFilterItems((prev) => prev.filter((name) => name !== filter));
  }

  return (
    <div className="pt-20">
      {/* Flight Search Form */}
      <div className="flex flex-col items-center justify-center gap-4 p-4 md:h-[350px] md:items-center md:flex-row bg-gradient-to-t from-[#15457b] to-[#051423] text-sm text-blue-400">
        <div
          className={commonClass + ' h-1/4 w-full'}
          onClick={handleFromClick}
          ref={fromRef}
        >
          <p>From</p>
          <p className="text-white">
            {fromCity}, {fromCountry}
          </p>
          {isFromPopupOpen && <FlightsSubPopup destination="from" />}
        </div>
        <div onClick={handleMainArrowButtonClick} className="cursor-pointer">
          <PiArrowsLeftRightLight />
        </div>
        <div
          className={commonClass + ' h-1/4 w-full'}
          onClick={handleToClick}
          ref={toRef}
        >
          <p>To</p>
          <p className="text-white">
            {toCity}, {toCountry}
          </p>
          {isToPopupOpen && <FlightsSubPopup destination="to" />}
        </div>
        <div
          className={commonClass + ' h-1/4 w-full'}
          onClick={handleDeparture}
          ref={dateRef}
        >
          <p>Depart</p>
          <p className="text-white">
            {weekday.slice(0, 3)}, {month} {day}, {longYear}
          </p>
          {isFlightsDatePopupOpen && <FlightsSubDatePopup />}
        </div>
        <div
          className={commonClass + ' h-1/4 w-full'}
          onClick={handleClass}
          ref={classRef}
        >
          <p>Passenger & Class</p>
          <p className="text-white">
            {number} {classType}
          </p>
          {isFlightsClassPopupOpen && <FlightsSubClassPopup />}
        </div>
        <button
          className="text-md m-[20px] flex md:h-[40px] md:w-[10%] items-center justify-center rounded-[35px] bg-gradient-to-r from-[#53b2fe] to-[#065af3] p-3 font-bold uppercase text-white h-fit w-full"
          onClick={handleSubSearch}
        >
          Search
        </button>
      </div>

      {/* Flights Results Section */}
      <div className="relative z-[1] flex w-full flex-col md:flex-row items-center md:items-start justify-center gap-8 bg-gray-200">
        <FlightsFilter
          fromCurrentCity={fromCurrentCity}
          lowestFlightPrice={lowestFlightPrice}
          highestFlightPrice={highestFlightPrice}
          filterItems={filterItems}
          onAddFilter={onAddFilter}
          flightList={flightsByUsingSortForPrice?.data.flights}
          filteredSortedFlights={filteredSortedFlights}
          setMaximumPrice={setMaximumPrice}
          maximumPrice={maximumPrice}
        />
        <div>
          <h2 className="relative md:bottom-28 z-20 py-4 pr-4 text-3xl font-semibold md:text-white text-black">
            Flights from {fromCurrentCity} to {toCurrentCity}
          </h2>
          <FlightsSort
            isLoading={isLoading}
            minimumDuration={minimumDuration}
            lowestFlightPrice={lowestFlightPrice}
          />
          {isLoading && <SpinnerMini />}
          {!isLoading && (
            <FlightsIndividualInformation flightsList={filteredSortedFlights} />
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightsSubTerminal;
