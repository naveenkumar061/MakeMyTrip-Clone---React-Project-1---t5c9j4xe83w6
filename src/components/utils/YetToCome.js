import { FaArrowLeft } from 'react-icons/fa';
import coming from '../assets/images/newFeatures.jpg';
import { useMoveBack } from '../hooks/useMoveBack';

function YetToCome() {
  const moveback = useMoveBack();

  return (
    <div
      className="h-screen w-screen rounded-lg bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${coming})` }}
    >
      <button
        className="flex items-center gap-4 rounded bg-blue-800 p-4 text-lg text-white outline-none hover:bg-blue-600 dark:bg-blue-600 dark:text-black dark:hover:bg-blue-800"
        onClick={moveback}
      >
        <FaArrowLeft /> Go Back
      </button>
    </div>
  );
}

export default YetToCome;
