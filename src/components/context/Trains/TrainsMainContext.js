import { format } from 'date-fns';
import { createContext, useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const TrainsMainContext = createContext();

function TrainsMainProvider({ children }) {
  const [isFromPopupOpen, setIsFromPopupOpen] = useState(false);
  const [isToPopupOpen, setIsToPopupOpen] = useState(false);
  const [isTravelDatePopupOpen, setIsTravelDatePopupOpen] = useState(false);
  const [from, setFrom] = useState('Delhi Junction');
  const [to, setTo] = useState('Salem Junction');
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState('Availablity (Default)');
  const [sortCard, setSortCard] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const dateRef = useRef(null);
  const inputRef = useRef(null);
  const sortRef = useRef(null);

  const longYear = format(date, 'yyyy');
  const year = format(date, 'yy');
  const weekday = format(date, 'EEEEEEE');
  const month = format(date, 'MMM');
  const day = format(date, 'dd');

  function handleFromClick(event) {
    event.stopPropagation();
    setIsFromPopupOpen(true);
    setIsToPopupOpen(false);
    setIsTravelDatePopupOpen(false);
  }

  function handleClickOutside(event) {
    if (fromRef.current && !fromRef.current.contains(event.target))
      setIsFromPopupOpen(false);
    if (toRef.current && !toRef.current.contains(event.target))
      setIsToPopupOpen(false);
    if (dateRef.current && !dateRef.current.contains(event.target))
      setIsTravelDatePopupOpen(false);
    if (sortRef.current && !sortRef.current.contains(event.target))
      setSortCard(false);
  }

  function showToast(condition) {
    if (condition) {
      toast.error('From & To trains cannot be the same', {
        style: { border: '1px solid black' },
      });
    }
  }

  function chooseJunction(junction, e, destination) {
    e.stopPropagation();
    if (destination === 'from') {
      setFrom(junction);
      setIsFromPopupOpen(false);
    } else if (destination === 'to') {
      setTo(junction);
      setIsToPopupOpen(false);
    }
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

  function handleDateChange(newDate) {
    setDate(newDate);
    setIsTravelDatePopupOpen(false);
  }

  function handleDateClose() {
    setIsTravelDatePopupOpen(false);
  }

  function handleMainArrowButtonClick(page) {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  function onAddFilter(filter, condition) {
    if (condition)
      setFilter((prev) => (prev.includes(filter) ? prev : [...prev, filter]));
    else setFilter((prev) => prev.filter((name) => name !== filter));
  }

  function trainSortPopup(event) {
    event.stopPropagation();
    setSortCard(!sortCard);
  }

  function handleSort(sortvalue, event) {
    event.stopPropagation();
    setSort(sortvalue);
    setSortCard(false);
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
    toRef,
    from,
    setFrom,
    to,
    setTo,
    showToast,
    inputRef,
    search,
    setSearch,
    chooseJunction,
    handleToClick,
    handleTravelDate,
    dateRef,
    date,
    setDate,
    longYear,
    year,
    weekday,
    month,
    day,
    handleDateChange,
    handleDateClose,
    handleMainArrowButtonClick,
    filter,
    setFilter,
    onAddFilter,
    sort,
    setSort,
    trainSortPopup,
    sortCard,
    setSortCard,
    handleSort,
    sortRef,
  };

  return (
    <TrainsMainContext.Provider value={content}>
      {children}
    </TrainsMainContext.Provider>
  );
}

function useTrainsMainContext() {
  const context = useContext(TrainsMainContext);
  if (context === undefined)
    throw new Error('TrainsMainContext was used outside of TrainsMainProvider');
  return context;
}

export { TrainsMainProvider, useTrainsMainContext };
