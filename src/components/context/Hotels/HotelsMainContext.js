import { createContext, useContext, useRef, useState } from "react";
import { useHotelsIndividualContext } from "./HotelsIndividualContext";
import { addDays, format } from "date-fns";

const HotelsMainContext = createContext();

function HotelsMainProvider({ children }) {
  const [isCityHotelPopupOpen, setIsCityHotelPopupOpen] = useState(false);
  const [isEntryDateHotelPopupOpen, setIsEntryDateHotelPopupOpen] =
    useState(false);
  const [isExitDateHotelPopupOpen, setIsExitDateHotelPopupOpen] =
    useState(false);
  const [isReservationHotelPopupOpen, setIsReservationHotelPopupOpen] =
    useState(false);
  const [hotelCity, setHotelCity] = useState("Jaipur");
  const [dateCheckIn, setDateCheckIn] = useState(new Date());
  const [dateCheckOut, setDateCheckOut] = useState(addDays(new Date(), 1));
  const [noOfRooms, setNoOfRooms] = useState(1);
  const [noOfAdults, setNoofAdults] = useState(2);
  const [isRoomQuantityPopup, setIsRoomQuantityPopup] = useState(false);
  const [isAdultQuantityPopup, setIsAdultQuantityPopup] = useState(false);

  const cityRef = useRef(null);
  const entryDateRef = useRef(null);
  const exitDateRef = useRef(null);
  const reservationRef = useRef(null);

  const { hotelsLocation, hotelsLocationsLoading, hotelsLocationsError } =
    useHotelsIndividualContext();

  const longYearCheckIn = format(dateCheckIn, "yyyy");
  const yearCheckIn = format(dateCheckIn, "yy");
  const weekdayCheckIn = format(dateCheckIn, "EEEEEEE");
  const monthCheckIn = format(dateCheckIn, "MMM");
  const dayCheckIn = format(dateCheckIn, "dd");

  const longYearCheckOut = format(dateCheckOut, "yyyy");
  const yearCheckOut = format(dateCheckOut, "yy");
  const weekdayCheckOut = format(dateCheckOut, "EEEEEEE");
  const monthCheckOut = format(dateCheckOut, "MMM");
  const dayCheckOut = format(dateCheckOut, "dd");

  function handleClickOutside(event) {
    if (cityRef.current && !cityRef.current.contains(event.target))
      setIsCityHotelPopupOpen(false);
    if (entryDateRef.current && !entryDateRef.current.contains(event.target))
      setIsEntryDateHotelPopupOpen(false);
    if (exitDateRef.current && !exitDateRef.current.contains(event.target))
      setIsExitDateHotelPopupOpen(false);
    if (
      reservationRef.current &&
      !reservationRef.current.contains(event.target)
    ) {
      setIsReservationHotelPopupOpen(false);
      setIsRoomQuantityPopup(false);
      setIsAdultQuantityPopup(false);
    }
  }

  function handleCityClick(event) {
    event.stopPropagation();
    setIsCityHotelPopupOpen(true);
    setIsEntryDateHotelPopupOpen(false);
    setIsExitDateHotelPopupOpen(false);
    setIsReservationHotelPopupOpen(false);
  }

  function handleEntryDate(event) {
    event.stopPropagation();
    setIsCityHotelPopupOpen(false);
    setIsEntryDateHotelPopupOpen(true);
    setIsExitDateHotelPopupOpen(false);
    setIsReservationHotelPopupOpen(false);
  }

  function handleExitDate(event) {
    event.stopPropagation();
    setIsCityHotelPopupOpen(false);
    setIsEntryDateHotelPopupOpen(false);
    setIsExitDateHotelPopupOpen(true);
    setIsReservationHotelPopupOpen(false);
  }

  function handleReservation(event) {
    event.stopPropagation();
    setIsCityHotelPopupOpen(false);
    setIsEntryDateHotelPopupOpen(false);
    setIsExitDateHotelPopupOpen(false);
    setIsReservationHotelPopupOpen(true);
  }

  function chooseHotelCity(city, e) {
    e.stopPropagation();
    setHotelCity(city);
    setIsCityHotelPopupOpen(false);
  }

  function handleCheckInDateChange(newDate) {
    setDateCheckIn(newDate);
    setDateCheckOut((item) => addDays(newDate, 1));
    setIsEntryDateHotelPopupOpen(false);
  }

  function handleCheckInDateClose() {
    setIsEntryDateHotelPopupOpen(false);
  }

  function handleCheckOutDateChange(newDate) {
    setDateCheckOut(newDate);
    setIsExitDateHotelPopupOpen(false);
  }

  function handleCheckOutDateClose() {
    setIsExitDateHotelPopupOpen(false);
  }

  function handleRoomQuantity(event) {
    event.stopPropagation();
    setIsRoomQuantityPopup(true);
    setIsAdultQuantityPopup(false);
  }

  function handleAdultQuantity(event) {
    event.stopPropagation();
    setIsRoomQuantityPopup(false);
    setIsAdultQuantityPopup(true);
  }

  function handleReservationClose(event) {
    event.stopPropagation();
    setIsReservationHotelPopupOpen(false);
  }

  function handleNumberOfRooms(event, value) {
    event.stopPropagation();
    setNoOfRooms(value);
    setNoofAdults(value);
    setIsRoomQuantityPopup(false);
    setIsAdultQuantityPopup(false);
  }

  function handleNumberOfAdults(event, value) {
    event.stopPropagation();
    setNoofAdults(value);
    setIsRoomQuantityPopup(false);
    setIsAdultQuantityPopup(false);
  }

  return (
    <HotelsMainContext.Provider
      value={{
        isCityHotelPopupOpen,
        setIsCityHotelPopupOpen,
        cityRef,
        hotelsLocation,
        hotelsLocationsLoading,
        hotelsLocationsError,
        hotelCity,
        setHotelCity,
        handleCityClick,
        chooseHotelCity,
        isEntryDateHotelPopupOpen,
        setIsEntryDateHotelPopupOpen,
        entryDateRef,
        dateCheckIn,
        setDateCheckIn,
        longYearCheckIn,
        yearCheckIn,
        monthCheckIn,
        weekdayCheckIn,
        dayCheckIn,
        handleEntryDate,
        handleCheckInDateChange,
        handleCheckInDateClose,
        isExitDateHotelPopupOpen,
        setIsExitDateHotelPopupOpen,
        exitDateRef,
        dateCheckOut,
        setDateCheckOut,
        longYearCheckOut,
        yearCheckOut,
        monthCheckOut,
        weekdayCheckOut,
        dayCheckOut,
        handleExitDate,
        handleCheckOutDateChange,
        handleCheckOutDateClose,
        isReservationHotelPopupOpen,
        setIsReservationHotelPopupOpen,
        reservationRef,
        noOfRooms,
        setNoOfRooms,
        isRoomQuantityPopup,
        setIsRoomQuantityPopup,
        noOfAdults,
        setNoofAdults,
        isAdultQuantityPopup,
        setIsAdultQuantityPopup,
        handleReservation,
        handleRoomQuantity,
        handleAdultQuantity,
        handleReservationClose,
        handleNumberOfRooms,
        handleNumberOfAdults,
        handleClickOutside,
      }}
    >
      {children}
    </HotelsMainContext.Provider>
  );
}

function useHotelsMainContext() {
  const context = useContext(HotelsMainContext);
  if (context === undefined)
    throw new Error("HotelsMainContext was used outside of HotelsMainProvider");
  return context;
}

export { HotelsMainProvider, useHotelsMainContext };
