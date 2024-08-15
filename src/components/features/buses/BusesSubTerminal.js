import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBusesMainContext } from '../../context/Buses/BusesMainContext';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BusSubPopup from './BusSubPopup';
import { PiArrowsLeftRightLight } from 'react-icons/pi';
import BusSubDatePopup from './BusSubDatePopup';
import BusesFilter from './BusesFilter';
import BusesSort from './BusesSort';
import SpinnerMini from '../../utils/SpinnerMini';
import BusesInfo from './BusesInfo';
import { useBusesSortByName } from './useBusesSortByName';

const commonClass =
  'relative h-14 flex-col gap-2 w-[20%] rounded-md bg-[#ffffff1a] px-4 font-semibold uppercase text-left cursor-pointer items-center justify-center';

function BusesSubTerminal() {
  const {
    from,
    to,
    showToast,
    handleClickOutside,
    setFrom,
    setTo,
    setDate,
    filter,
    sort,
    weekday,
    month,
    day,
    year,
    handleFromClick,
    fromRef,
    isFromPopupOpen,
    handleMainArrowButtonClick,
    handleToClick,
    toRef,
    isToPopupOpen,
    handleTravelDate,
    dateRef,
    longYear,
    isTravelDatePopupOpen,
  } = useBusesMainContext();

  const navigate = useNavigate();

  const [filteredSortedBuses, setFilteredSortedBuses] = useState();

  const [searchParams] = useSearchParams();

  const sourceInfo = searchParams.get('source');
  const destinationInfo = searchParams.get('destination');
  const selectedDayInfo = searchParams.get('day');
  const selectedDateInfo = searchParams.get('date');

  const { busesSortByName, isLoading } = useBusesSortByName(
    sourceInfo.split(',')[0],
    destinationInfo.split(',')[0],
    selectedDayInfo.slice(0, 3)
  );

  const allBuses = busesSortByName?.data?.buses;

  useEffect(() => {
    let condition = from === to;

    showToast(condition);

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      toast.dismiss();
    };
  }, [from, to, handleClickOutside, showToast]);

  useEffect(() => {
    setFrom(sourceInfo);
    setTo(destinationInfo);
    setDate(new Date(selectedDateInfo));
  }, [sourceInfo, destinationInfo, selectedDateInfo]);

  useEffect(() => {
    setFilteredSortedBuses(busesSortByName?.data?.buses);
  }, [busesSortByName]);

  function timeToDecimal(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + minutes / 60;
  }

  useEffect(() => {
    let filterBuses = '';

    for (let i = 0; i < filter.length; i++) {
      if (filter[i] === 'AC')
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter((bus) => bus.type === 'AC'),
        ];

      if (filter[i] === 'Non AC')
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter((bus) => bus.type === 'Non-AC'),
        ];

      if (filter[i] === 'Pick Up 6 11') {
        const min = filter[i].split(' ')[2];
        const max = filter[i].split(' ')[3];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.arrivalTime) >= min &&
              timeToDecimal(bus.arrivalTime) <= max
          ),
        ];
      }

      if (filter[i] === 'Pick Up 11 18') {
        const min = filter[i].split(' ')[2];
        const max = filter[i].split(' ')[3];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.arrivalTime) >= min &&
              timeToDecimal(bus.arrivalTime) <= max
          ),
        ];
      }

      if (filter[i] === 'Pick Up 18 23') {
        const min = filter[i].split(' ')[2];
        const max = filter[i].split(' ')[3];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.arrivalTime) >= min &&
              timeToDecimal(bus.arrivalTime) <= max
          ),
        ];
      }

      if (filter[i] === 'Pick Up 23 6') {
        const min = filter[i].split(' ')[2];
        const max = filter[i].split(' ')[3];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.arrivalTime) >= min &&
              timeToDecimal(bus.arrivalTime) <= 24
          ),
        ];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.arrivalTime) >= 0 &&
              timeToDecimal(bus.arrivalTime) <= max
          ),
        ];
      }

      if (filter[i] === 'Drop 6 11') {
        const min = filter[i].split(' ')[1];
        const max = filter[i].split(' ')[2];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.departureTime) >= min &&
              timeToDecimal(bus.departureTime) <= max
          ),
        ];
      }

      if (filter[i] === 'Drop 11 18') {
        const min = filter[i].split(' ')[1];
        const max = filter[i].split(' ')[2];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.departureTime) >= min &&
              timeToDecimal(bus.departureTime) <= max
          ),
        ];
      }

      if (filter[i] === 'Drop 18 23') {
        const min = filter[i].split(' ')[1];
        const max = filter[i].split(' ')[2];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.departureTime) >= min &&
              timeToDecimal(bus.departureTime) <= max
          ),
        ];
      }

      if (filter[i] === 'Drop 23 6') {
        const min = filter[i].split(' ')[1];
        const max = filter[i].split(' ')[2];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.departureTime) >= min &&
              timeToDecimal(bus.departureTime) <= 24
          ),
        ];
        filterBuses = [
          ...filterBuses,
          ...allBuses?.filter(
            (bus) =>
              timeToDecimal(bus.departureTime) >= 0 &&
              timeToDecimal(bus.departureTime) <= max
          ),
        ];
      }
    }

    if (filter.length === 0) filterBuses = allBuses;

    filterBuses = [...new Set(filterBuses)];

    if (sort === 'Name')
      filterBuses = filterBuses.sort((a, b) => a.name?.localeCompare(b.name));

    if (sort === 'Cheap')
      filterBuses = filterBuses.sort((a, b) => a.fare - b.fare);

    if (sort === 'Arrival')
      filterBuses = filterBuses.sort((a, b) =>
        a.arrivalTime?.localeCompare(b.arrivalTime)
      );

    if (sort === 'Departure')
      filterBuses = filterBuses.sort((a, b) =>
        a.departureTime?.localeCompare(b.departureTime)
      );

    setFilteredSortedBuses(filterBuses);
  }, [filter, sort]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter]);

  function handleSubSearch() {
    if (from !== to) {
      const searchParams = new URLSearchParams();
      searchParams.append('source', from);
      searchParams.append('destination', to);
      searchParams.append('day', weekday);
      searchParams.append('date', `${month}/${day}/${year}`);
      navigate({
        pathname: '/bus-tickets/search',
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
    <div className="pt-20">
      <div className="flex flex-col items-center justify-center gap-4 p-4 md:h-[350px] md:items-center md:flex-row bg-gradient-to-t from-[#15457b] to-[#051423] text-sm text-blue-400">
        <div
          className={commonClass + ' h-1/4 w-full'}
          onClick={handleFromClick}
          ref={fromRef}
        >
          <p>From</p>
          <p className="text-white">{from}</p>
          {isFromPopupOpen && <BusSubPopup destination="from" />}
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
          <p className="text-white">{to}</p>
          {isToPopupOpen && <BusSubPopup destination="to" />}
        </div>
        <div
          className={commonClass + ' h-1/4 w-full'}
          onClick={handleTravelDate}
          ref={dateRef}
        >
          <p>Travel Date</p>
          <p className="text-white">
            {weekday.slice(0, 3)}, {month} {day}, {longYear}
          </p>
          {isTravelDatePopupOpen && <BusSubDatePopup />}
        </div>
        <button
          className="text-md m-[20px] flex md:h-[40px] md:w-[10%] items-center justify-center rounded-[35px] bg-gradient-to-r from-[#53b2fe] to-[#065af3] p-3 font-bold uppercase text-white h-fit w-full"
          onClick={handleSubSearch}
        >
          Search
        </button>
      </div>
      <div className="flex flex-col pt-8 gap-2 md:flex-row w-full bg-[rgb(245,245,245)]">
        <BusesFilter from={from} to={to} />
        <div className="w-full md:w-[70vw] flex flex-col gap-2">
          <div>
            <div className="border border-[#e7e7e7] rounded-2xl bg-white py-2 px-5 flex items-center justify-between">
              <p className="text-sm font-semibold">
                {filteredSortedBuses?.length} buses found
              </p>
              <BusesSort />
            </div>
          </div>
          {isLoading && <SpinnerMini />}
          {!isLoading && (
            <BusesInfo filteredSortedBuses={filteredSortedBuses} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BusesSubTerminal;
