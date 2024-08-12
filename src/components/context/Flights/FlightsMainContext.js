import { createContext, useContext, useRef, useState } from 'react';
import { useFlightIndividualContext } from './FlightsIndividualContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { airlineData } from '../../assets/data/AirlineData';

const FlightsMainContext = createContext();

function FlightsMainProvider({ children }) {
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
  const [isFlightsDatePopupOpen, setIsFlightsDatePopupOpen] = useState(false);
  const [isFlightsClassPopupOpen, setIsFlightsClassPopupOpen] = useState(false);
  const [fromIndex, setFromIndex] = useState('6514309e348f6fafa1b86607');
  const [toIndex, setToIndex] = useState('6514309e348f6fafa1b86609');
  const { airportList, cityName, setCityName } = useFlightIndividualContext();
  const [date, setDate] = useState(new Date());
  const [number, setNumber] = useState(1);
  const [classType, setClassType] = useState('Economy/Premium Economy');
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const dateRef = useRef(null);
  const classRef = useRef(null);
  const inputRef = useRef(null);
  const [search, setSearch] = useState('');
  const [sortValue, setSortValue] = useState('price');

  const longYear = format(date, 'yyyy');
  const year = format(date, 'yy');
  const weekday = format(date, 'EEEEEEE');
  const month = format(date, 'MMM');
  const day = format(date, 'dd');

  const {
    city: fromCity,
    name: fromName,
    country: fromCountry,
    iata_code: fromIataCode,
  } = airportList?.find(
    (airport) =>
      airport?._id === fromIndex ||
      airport?.city === fromIndex ||
      airport?.iata_code === fromIndex
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
      airport?.iata_code === toIndex
  ) || {};

  function showToast(condition) {
    if (condition) {
      toast.error('From & To airports cannot be the same', {
        style: { border: '1px solid black' },
      });
    }
  }

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

  function handleFromClick(event) {
    event.stopPropagation();
    setIsFromPopupOpen(true);
    setIsToPopupOpen(false);
    setIsFlightsDatePopupOpen(false);
    setIsFlightsClassPopupOpen(false);
  }

  function handleToClick(event) {
    event.stopPropagation();
    setIsToPopupOpen(true);
    setIsFromPopupOpen(false);
    setIsFlightsDatePopupOpen(false);
    setIsFlightsClassPopupOpen(false);
  }

  function handleMainArrowButtonClick() {
    const tempIndex = fromIndex;
    setFromIndex(toIndex);
    setToIndex(tempIndex);
  }

  function handleDeparture(event) {
    event.stopPropagation();
    setIsFlightsDatePopupOpen(true);
    setIsFromPopupOpen(false);
    setIsToPopupOpen(false);
    setIsFlightsClassPopupOpen(false);
  }

  function handleDateChange(newDate) {
    setDate(newDate);
    setIsFlightsDatePopupOpen(false);
  }

  function handleDateClose() {
    setIsFlightsDatePopupOpen(false);
  }

  function handleClass(event) {
    event.stopPropagation();
    setIsFlightsClassPopupOpen(true);
    setIsFromPopupOpen(false);
    setIsToPopupOpen(false);
    setIsFlightsDatePopupOpen(false);
  }

  function chooseCity(index, e, destination) {
    e.stopPropagation();
    if (destination === 'from') {
      setFromIndex(index);
      setIsFromPopupOpen(false);
    } else if (destination === 'to') {
      setToIndex(index);
      setIsToPopupOpen(false);
    }
  }

  function handleClassClose(event) {
    event.stopPropagation();
    setIsFlightsClassPopupOpen(false);
  }

  function airlineInfo(flight) {
    return airlineData.find(
      (airline) => airline.model === flight.aircraftModel
    );
  }

  function travelDuration(flight) {
    return flight.duration > 10
      ? `${flight.duration} h`
      : `0${flight.duration} h`;
  }

  function stops(flight) {
    return flight.stops > 0 ? `${flight.stops} stop` : 'Non stop';
  }

  function prices(flight) {
    return `₹ ${flight.ticketPrice}`;
  }

  function seatsAvailable(flight) {
    return `${flight.availableSeats} seats left`;
  }

  function imageName(airlinelist) {
    return airlinelist.name.toLowerCase().replaceAll(' ', '') + 'img.png';
  }

  function imageSource(name) {
    return require(`../../assets/images/${name}`);
  }

  const content = {
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
  };

  return (
    <FlightsMainContext.Provider value={content}>
      {children}
    </FlightsMainContext.Provider>
  );
}

function useFlightsMainContext() {
  const context = useContext(FlightsMainContext);
  if (context === undefined)
    throw new Error(
      'FlightsMainContext was used outside of FlightsMainProvider'
    );
  return context;
}

export { FlightsMainProvider, useFlightsMainContext };
