import { CiLocationOn } from 'react-icons/ci';
import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';

function TrainsSubPopupList({ trainInfo, destination }) {
  const { chooseJunction } = useTrainsMainContext();

  return (
    <div
      className="flex w-full items-center gap-2 p-2 hover:bg-gray-200"
      onClick={(e) => chooseJunction(trainInfo, e, destination)}
    >
      <CiLocationOn />
      <p>{trainInfo}</p>
    </div>
  );
}

export default TrainsSubPopupList;
