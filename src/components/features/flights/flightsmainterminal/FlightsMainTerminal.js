// Import third-party libraries
import { FaAngleDown } from 'react-icons/fa';
import { PiArrowsLeftRightLight } from 'react-icons/pi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Import context
import { useFlightsMainContext } from '../../../context/Flights/FlightsMainContext';

// Import local data
import FlightsNoPopup from './flightspopupstate/flightsnopopup/FlightsNoPopup';
import FlightsPopup from './flightspopupstate/flightspopup/FlightsPopup';
import FlightsDateNoPopup from './flightsdatehandler/FlightsDateNoPopup';
import FlightsDatePopup from './flightsdatehandler/FlightsDatePopup';
import FlightsClassNoPopup from './flightsclassstate/flightsclassnopopup/FlightsClassNoPopup';
import FlightsClassPopup from './flightsclassstate/flightsclasspopup/FlightsClassPopup';

// Common styles
const commonBorderStyle = 'border-gray-200 border-r-2';
const commonPadding = 'p-4';
const commonHoverStyle = 'hover:bg-blue-100';

function FlightsMainTerminal() {
  // Destructure state values from the context
  const {
    isFromPopupOpen,
    fromIndex,
    fromIataCode,
    fromRef,
    handleFromClick,
    isToPopupOpen,
    toIndex,
    toIataCode,
    toRef,
    handleToClick,
    handleMainArrowButtonClick,
    showToast,
    isFlightsDatePopupOpen,
    year,
    weekday,
    month,
    day,
    dateRef,
    handleDeparture,
    isFlightsClassPopupOpen,
    number,
    classType,
    classRef,
    handleClass,
    handleClickOutside,
  } = useFlightsMainContext();

  const navigate = useNavigate();

  useEffect(() => {
    let condition = fromIndex === toIndex;

    showToast(condition);

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      toast.dismiss();
    };
  }, [fromIndex, toIndex, handleClickOutside, showToast]);

  function handleMainSearch() {
    if (fromIndex !== toIndex) {
      const searchParams = new URLSearchParams();
      searchParams.append('source', fromIataCode);
      searchParams.append('destination', toIataCode);
      searchParams.append('day', weekday);
      searchParams.append('date', `${month}/${day}/${year}`);
      searchParams.append('passenger', classType);
      searchParams.append('number', number);
      navigate({
        pathname: '/flights/search',
        search: `?${searchParams.toString()}`,
      });
    } else {
      toast.dismiss();
      toast.error(
        'Cannot proceed further until the source and destination are different. Please correct it.',
        { style: { border: '1px solid black' } }
      );
    }
  }

  return (
    <div className="relative my-6 max-1200:mb-0">
      {/* Heading */}
      <p className="py-2 text-right">Book International and Domestic Flights</p>

      {/* Main container for flight search form */}
      <div className="relative flex rounded-md border-2 border-gray-200 flex-col md:flex-row">
        {/* From field */}
        <div
          className={`${
            isFromPopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } ${commonBorderStyle} ${commonPadding} ${commonHoverStyle} w-full`}
          onClick={handleFromClick}
          ref={fromRef}
        >
          <p>From</p>
          {!isFromPopupOpen && <FlightsNoPopup destination="from" />}
          {isFromPopupOpen && <FlightsPopup destination="from" />}
        </div>

        {/* To field */}
        <div
          className={`flex-grow ${commonBorderStyle} ${
            isToPopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } ${commonPadding} ${commonHoverStyle} w-full`}
          onClick={handleToClick}
          ref={toRef}
        >
          <p>To</p>
          {!isToPopupOpen && <FlightsNoPopup destination="to" />}
          {isToPopupOpen && <FlightsPopup destination="to" />}
        </div>

        {/* Departure date field */}
        <div
          className={`flex-grow ${commonBorderStyle} ${commonPadding} ${
            isFlightsDatePopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } ${commonHoverStyle} w-full`}
          onClick={handleDeparture}
          ref={dateRef}
        >
          <div className="flex items-center gap-2">
            <p>Departure</p>
            <p className="text-blue-400">
              <FaAngleDown />
            </p>
          </div>
          {!isFlightsDatePopupOpen && <FlightsDateNoPopup />}
          {isFlightsDatePopupOpen && <FlightsDatePopup />}
        </div>

        {/* Travellers & Class field */}
        <div
          className={`flex-grow ${commonPadding} ${commonHoverStyle} ${
            isFlightsClassPopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } w-full`}
          ref={classRef}
          onClick={handleClass}
        >
          <div className="flex items-center gap-2">
            <p>Travellers & Class</p>
            <p className="text-blue-400">
              <FaAngleDown />
            </p>
          </div>
          {!isFlightsClassPopupOpen && <FlightsClassNoPopup />}
          {isFlightsClassPopupOpen && <FlightsClassPopup />}
        </div>
      </div>

      {/* Swap locations button */}
      <button
        className="absolute top-[22.5%] right-1/2 md:top-[45%] md:right-[72%] min-850:right-[72.5%] lg:top-[45%] lg:left-[22.95%] min-1200:left-[28.5%] min-1240:left-[23.75%] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-blue-500 shadow-md"
        onClick={handleMainArrowButtonClick}
      >
        <PiArrowsLeftRightLight className="text-lg font-bold text-blue-500" />
      </button>

      {/* Search button */}
      <button
        className="relative left-[40%] top-20 w-1/6 rounded-3xl bg-gradient-to-r from-blue-400 to-blue-600 px-12 py-1 text-center text-2xl font-semibold uppercase text-white max-1250:left-[25%] max-1250:top-12 max-1250:w-[45%] max-1250:p-0"
        onClick={handleMainSearch}
      >
        Search
      </button>
    </div>
  );
}

export default FlightsMainTerminal;
