import { CiLocationOn } from 'react-icons/ci';
import { useBusesMainContext } from '../../context/Buses/BusesMainContext';

function BusPopupList({ busInfo, destination }) {
  const { chooseCity } = useBusesMainContext();

  return (
    <div
      className="flex w-full items-center gap-2 p-2 hover:bg-gray-200"
      onClick={(e) => chooseCity(busInfo, e, destination)}
    >
      <CiLocationOn />
      <p>{busInfo}</p>
    </div>
  );
}

export default BusPopupList;
