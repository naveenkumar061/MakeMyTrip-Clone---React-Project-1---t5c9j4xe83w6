import { useHotelsMainContext } from '../../../../context/Resort/HotelsMainContext';

function HotelsCheckInNoPopup() {
  const { yearCheckIn, monthCheckIn, weekdayCheckIn, dayCheckIn } =
    useHotelsMainContext();

  return (
    <div>
      <h1 className="text-3xl font-bold">
        {dayCheckIn}
        <span className="pl-2 text-2xl font-normal">
          {monthCheckIn}'{yearCheckIn}
        </span>
      </h1>
      <p>{weekdayCheckIn}</p>
    </div>
  );
}

export default HotelsCheckInNoPopup;
