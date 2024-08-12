import { FaAngleDown } from 'react-icons/fa';
import { PiArrowsLeftRightLight } from 'react-icons/pi';
import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';
import TrainsNoPopup from './TrainsNoPopup';
import TrainsPopup from './TrainsPopup';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import TravelDateNoPopup from './TravelDateNoPopup';
import TravelDatepopup from './TravelDatepopup';
import { useNavigate } from 'react-router-dom';

const commonBorderStyle = 'border-gray-200 border-r-2';
const commonPadding = 'p-4';
const commonHoverStyle = 'hover:bg-blue-100';

function TrainsMainTerminal() {
  const {
    isFromPopupOpen,
    handleFromClick,
    fromRef,
    from,
    to,
    showToast,
    handleClickOutside,
    isToPopupOpen,
    handleToClick,
    toRef,
    isTravelDatePopupOpen,
    handleTravelDate,
    dateRef,
    handleMainArrowButtonClick,
    weekday,
    day,
    month,
    year,
  } = useTrainsMainContext();

  const navigate = useNavigate();

  useEffect(() => {
    let condition = from === to;

    showToast(condition);

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      toast.dismiss();
    };
  }, [from, to, handleClickOutside, showToast]);

  function handleMainSearch() {
    if (from !== to) {
      const searchParams = new URLSearchParams();
      searchParams.append('source', from);
      searchParams.append('destination', to);
      searchParams.append('day', weekday);
      searchParams.append('date', `${month}/${day}/${year}`);
      navigate({
        pathname: '/railways/search',
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
      <p className="py-2 text-right text-sm font-bold">Train Ticket Booking</p>
      <p className="text-right text-sm">IRCTC Authorized e-ticketing</p>
      <div className="w-full relative flex rounded-md border-2 border-gray-200 flex-col md:flex-row">
        <div
          className={`${
            isFromPopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } ${commonBorderStyle} ${commonPadding} ${commonHoverStyle} w-full md:w-[40%] h-[7.5rem]`}
          onClick={handleFromClick}
          ref={fromRef}
        >
          <p className="md:w-[450px]">From</p>
          {!isFromPopupOpen && <TrainsNoPopup destination="from" />}
          {isFromPopupOpen && <TrainsPopup destination="from" />}
        </div>

        <div
          className={`flex-grow ${commonBorderStyle} ${
            isToPopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } ${commonPadding} ${commonHoverStyle} w-full md:w-[40%] h-[7.5rem]`}
          onClick={handleToClick}
          ref={toRef}
        >
          <p className="md:w-[450px]">To</p>
          {!isToPopupOpen && <TrainsNoPopup destination="to" />}
          {isToPopupOpen && <TrainsPopup destination="to" />}
        </div>

        <div
          className={`flex-grow ${commonPadding} ${
            isTravelDatePopupOpen && 'bg-blue-100 font-medium text-blue-400'
          } ${commonHoverStyle} w-full`}
          onClick={handleTravelDate}
          ref={dateRef}
        >
          <div className="flex items-center gap-2">
            <p>Travel Date</p>
            <p className="text-blue-400">
              <FaAngleDown />
            </p>
          </div>
          {!isTravelDatePopupOpen && <TravelDateNoPopup />}
          {isTravelDatePopupOpen && <TravelDatepopup />}
        </div>
      </div>

      <button
        className="absolute top-1/3 right-1/2 md:top-1/2 md:right-[57.5%] min-900:right-[58%] min-1100:right-[58.5%] xl:-translate-x-[10%] min-1300:-translate-x-[30%] min-1320:-translate-x-1/2 min-1350:-translate-x-[85%] min-1400:-translate-x-[140%] min-1450:-translate-x-[190%] min-1500:-translate-x-[245%] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-blue-500 shadow-md"
        onClick={handleMainArrowButtonClick}
      >
        <PiArrowsLeftRightLight className="text-lg font-bold text-blue-500" />
      </button>

      <button
        className="relative left-[40%] top-20 w-1/6 rounded-3xl bg-gradient-to-r from-blue-400 to-blue-600 px-12 py-1 text-center text-2xl font-semibold uppercase text-white max-1250:left-[25%] max-1250:top-12 max-1250:w-[45%] max-1250:p-0"
        onClick={handleMainSearch}
      >
        Search
      </button>
    </div>
  );
}

export default TrainsMainTerminal;
