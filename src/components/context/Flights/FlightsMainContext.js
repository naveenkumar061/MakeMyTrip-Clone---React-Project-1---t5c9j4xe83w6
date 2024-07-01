import { createContext, useContext, useRef, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useFlightIndividualContext } from "./FlightsIndividualContext";
import { airlineData } from "../../data/Info/airline/AirlineData";

// Creating a context for FlightsMain
const FlightsMainContext = createContext();

// Provider component for FlightsMain context
function FlightsMainProvider({ children }) {
  // State hooks for managing popup states
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
  const [isFlightsDatePopupOpen, setIsFlightsDatePopupOpen] = useState(false);
  const [isFlightsClassPopupOpen, setIsFlightsClassPopupOpen] = useState(false);

  // State hooks for managing selected airport indices
  const [fromIndex, setFromIndex] = useState("6514309e348f6fafa1b86607");
  const [toIndex, setToIndex] = useState("6514309e348f6fafa1b86609");

  // Destructuring from the FlightsIndividualContext
  const { airportList, cityName, setCityName } = useFlightIndividualContext();

  // State hooks for managing flight details
  const [date, setDate] = useState(new Date());
  const [number, setNumber] = useState(1);
  const [classType, setClassType] = useState("Economy/Premium Economy");

  // Ref hooks for managing references to popup elements
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const dateRef = useRef(null);
  const classRef = useRef(null);
  const inputRef = useRef(null);

  // State hooks for managing search and sort values
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("price");

  // Destructuring airport details based on selected indices
  const {
    city: fromCity,
    name: fromName,
    country: fromCountry,
    iata_code: fromIataCode,
  } = airportList?.find(
    (airport) =>
      airport?._id === fromIndex ||
      airport?.city === fromIndex ||
      airport?.iata_code === fromIndex,
  ) || {};

  const {
    city: toCity,
    name: toName,
    country: toCountry,
    iata_code: toIataCode,
  } = airportList?.find(
    (airport) =>
      airport?._id === toIndex ||
      airport?.city === toIndex ||
      airport?.iata_code === toIndex,
  ) || {};

  // Formatting date details
  const longYear = format(date, "yyyy");
  const year = format(date, "yy");
  const weekday = format(date, "EEEEEEE");
  const month = format(date, "MMM");
  const day = format(date, "dd");

  // Function to show a toast notification
  function showToast(condition) {
    if (condition) {
      toast.error("From & To airports cannot be the same", {
        style: { border: "1px solid black" },
      });
    }
  }

  // Function to handle click outside popups
  function handleClickOutside(event) {
    if (fromRef.current && !fromRef.current.contains(event.target))
      setIsFromPopupOpen(false);
    if (toRef.current && !toRef.current.contains(event.target))
      setIsToPopupOpen(false);
    if (dateRef.current && !dateRef.current.contains(event.target))
      setIsFlightsDatePopupOpen(false);
    if (classRef.current && !classRef.current.contains(event.target))
      setIsFlightsClassPopupOpen(false);
  }

  // Function to handle from airport click
  function handleFromClick(event) {
    event.stopPropagation();
    setIsFromPopupOpen(true);
    setIsToPopupOpen(false);
    setIsFlightsDatePopupOpen(false);
    setIsFlightsClassPopupOpen(false);
  }

  // Function to handle to airport click
  function handleToClick(event) {
    event.stopPropagation();
    setIsToPopupOpen(true);
    setIsFromPopupOpen(false);
    setIsFlightsDatePopupOpen(false);
    setIsFlightsClassPopupOpen(false);
  }

  // Function to handle swapping from and to airports
  function handleMainArrowButtonClick(page) {
    const tempIndex = fromIndex;
    setFromIndex(toIndex);
    setToIndex(tempIndex);
  }

  // Function to handle departure date click
  function handleDeparture(event) {
    event.stopPropagation();
    setIsFlightsDatePopupOpen(true);
    setIsFromPopupOpen(false);
    setIsToPopupOpen(false);
    setIsFlightsClassPopupOpen(false);
  }

  // Function to handle date change
  function handleDateChange(newDate) {
    setDate(newDate);
    setIsFlightsDatePopupOpen(false);
  }

  // Function to close date popup
  function handleDateClose() {
    setIsFlightsDatePopupOpen(false);
  }

  // Function to handle class selection click
  function handleClass(event) {
    event.stopPropagation();
    setIsFlightsClassPopupOpen(true);
    setIsFromPopupOpen(false);
    setIsToPopupOpen(false);
    setIsFlightsDatePopupOpen(false);
  }

  // Function to close class selection popup
  function handleClassClose(event) {
    event.stopPropagation();
    setIsFlightsClassPopupOpen(false);
  }

  // Function to choose city for from or to airport
  function chooseCity(index, e, destination) {
    e.stopPropagation();
    if (destination === "from") {
      setFromIndex(index);
      setIsFromPopupOpen(false);
    } else if (destination === "to") {
      setToIndex(index);
      setIsToPopupOpen(false);
    }
  }

  // Function to get airline information
  function airlineInfo(flight) {
    return airlineData.find(
      (airline) => airline.model === flight.aircraftModel,
    );
  }

  // Function to get travel duration
  function travelDuration(flight) {
    return flight.duration > 10
      ? `${flight.duration} h`
      : `0${flight.duration} h`;
  }

  // Function to get number of stops
  function stops(flight) {
    return flight.stops > 0 ? `${flight.stops} stop` : "Non stop";
  }

  // Function to get ticket prices
  function prices(flight) {
    return `₹ ${flight.ticketPrice}`;
  }

  // Function to get seats available
  function seatsAvailable(flight) {
    return `${flight.availableSeats} seats left`;
  }

  // Function to get image name based on airline list
  function imageName(airlinelist) {
    return airlinelist.name.toLowerCase().replaceAll(" ", "") + "img.png";
  }

  // Function to get image source
  function imageSource(name) {
    return require(`../../data/Images/AirlinesModelList/${name}`);
  }

  return (
    <FlightsMainContext.Provider
      value={{
        isFromPopupOpen,
        setIsFromPopupOpen,
        fromIndex,
        setFromIndex,
        fromCity,
        fromName,
        fromCountry,
        fromIataCode,
        fromRef,
        handleFromClick,
        isToPopupOpen,
        setIsToPopupOpen,
        toIndex,
        setToIndex,
        toCity,
        toName,
        toCountry,
        toIataCode,
        toRef,
        handleToClick,
        handleMainArrowButtonClick,
        showToast,
        isFlightsDatePopupOpen,
        setIsFlightsDatePopupOpen,
        date,
        setDate,
        longYear,
        year,
        weekday,
        month,
        day,
        dateRef,
        handleDeparture,
        handleDateChange,
        handleDateClose,
        isFlightsClassPopupOpen,
        setIsFlightsClassPopupOpen,
        number,
        setNumber,
        classType,
        setClassType,
        classRef,
        handleClass,
        handleClassClose,
        handleClickOutside,
        airportList,
        inputRef,
        search,
        setSearch,
        cityName,
        setCityName,
        chooseCity,
        sortValue,
        setSortValue,
        airlineInfo,
        travelDuration,
        stops,
        prices,
        seatsAvailable,
        imageName,
        imageSource,
      }}
    >
      {children}
    </FlightsMainContext.Provider>
  );
}

// Custom hook to use FlightsMainContext
function useFlightsMainContext() {
  const context = useContext(FlightsMainContext);
  if (context === undefined)
    throw new Error(
      "FlightsMainContext was used outside of FlightsMainProvider",
    );
  return context;
}

export { FlightsMainProvider, useFlightsMainContext };
