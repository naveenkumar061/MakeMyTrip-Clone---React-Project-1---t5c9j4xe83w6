import { format } from 'date-fns';
import { createContext, useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const BusesMainContext = createContext();

function BusesMainProvider({ children }) {
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
  const [isTravelDatePopupOpen, setIsTravelDatePopupOpen] = useState(false);
  const [from, setFrom] = useState('Bangalore, Karnataka');
  const [to, setTo] = useState('Jabalpur, Madhya Pradesh');
  const [date, setDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState('Name');

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const dateRef = useRef(null);
  const inputRef = useRef(null);

  const longYear = format(date, 'yyyy');
  const year = format(date, 'yy');
  const weekday = format(date, 'EEEEEEE');
  const month = format(date, 'MMM');
  const day = format(date, 'dd');

  function handleClickOutside(event) {
    if (fromRef.current && !fromRef.current.contains(event.target))
      setIsFromPopupOpen(false);
    if (toRef.current && !toRef.current.contains(event.target))
      setIsToPopupOpen(false);
    if (dateRef.current && !dateRef.current.contains(event.target))
      setIsTravelDatePopupOpen(false);
  }

  function handleFromClick(event) {
    event.stopPropagation();
    setIsFromPopupOpen(true);
    setIsToPopupOpen(false);
    setIsTravelDatePopupOpen(false);
  }

  function handleToClick(event) {
    event.stopPropagation();
    setIsToPopupOpen(true);
    setIsFromPopupOpen(false);
    setIsTravelDatePopupOpen(false);
  }

  function handleTravelDate(event) {
    event.stopPropagation();
    setIsTravelDatePopupOpen(true);
    setIsFromPopupOpen(false);
    setIsToPopupOpen(false);
  }

  function handleMainArrowButtonClick() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  function showToast(condition) {
    if (condition) {
      toast.error('From & To trains cannot be the same', {
        style: { border: '1px solid black' },
      });
    }
  }

  function chooseCity(bus, e, destination) {
    e.stopPropagation();
    if (destination === 'from') {
      setFrom(bus);
      setIsFromPopupOpen(false);
    } else if (destination === 'to') {
      setTo(bus);
      setIsToPopupOpen(false);
    }
  }

  function handleDateChange(newDate) {
    setDate(newDate);
    setIsTravelDatePopupOpen(false);
  }

  function handleDateClose() {
    setIsTravelDatePopupOpen(false);
  }

  function onAddFilter(filter, condition) {
    if (condition)
      setFilter((prev) => (prev.includes(filter) ? prev : [...prev, filter]));
    else setFilter((prev) => prev.filter((name) => name !== filter));
  }

  const content = {
    isFromPopupOpen,
    setIsFromPopupOpen,
    handleFromClick,
    isToPopupOpen,
    setIsToPopupOpen,
    isTravelDatePopupOpen,
    setIsTravelDatePopupOpen,
    fromRef,
    handleClickOutside,
    handleToClick,
    toRef,
    dateRef,
    handleTravelDate,
    handleMainArrowButtonClick,
    from,
    to,
    setFrom,
    setTo,
    date,
    setDate,
    longYear,
    year,
    weekday,
    month,
    day,
    showToast,
    inputRef,
    search,
    setSearch,
    chooseCity,
    handleDateChange,
    handleDateClose,
    filter,
    setFilter,
    onAddFilter,
    sort,
    setSort,
  };

  return (
    <BusesMainContext.Provider value={content}>
      {children}
    </BusesMainContext.Provider>
  );
}

function useBusesMainContext() {
  const context = useContext(BusesMainContext);
  if (context === undefined)
    throw new Error('BusesMainContext was used outside of BusesMainProvider');
  return context;
}

export { BusesMainProvider, useBusesMainContext };
