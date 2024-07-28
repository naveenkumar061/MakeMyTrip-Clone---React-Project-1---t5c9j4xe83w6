import { useHotelsMainContext } from '../../../../context/Resort/HotelsMainContext';

function HotelsCheckOutNoPopup() {
  const { yearCheckOut, monthCheckOut, weekdayCheckOut, dayCheckOut } =
    useHotelsMainContext();

  return (
    <div>
      <h1 className="text-3xl font-bold">
        {dayCheckOut}
        <span className="pl-2 text-2xl font-normal">
          {monthCheckOut}'{yearCheckOut}
        </span>
      </h1>
      <p>{weekdayCheckOut}</p>
    </div>
  );
}

export default HotelsCheckOutNoPopup;
