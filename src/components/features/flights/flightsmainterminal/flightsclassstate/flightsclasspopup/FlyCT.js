// Path imports
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Context imports
import { useFlightsMainContext } from "../../../../../context/Flights/FlightsMainContext";

function FlyCT() {
  // Extracting the number and setNumber functions from FlightsMainContext
  const { number, setNumber } = useFlightsMainContext();

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-400">
      {/* Decrement button: Decreases the number if it's greater than or equal to 2 */}
      <button
        onClick={() => {
          if (number >= 2) setNumber(number - 1);
        }}
        className="cursor-pointer rounded-md py-2 text-center text-lg active:bg-blue-400"
      >
        <RemoveIcon />
      </button>

      {/* Display the current number */}
      <p>{number}</p>

      {/* Increment button: Increases the number by 1 */}
      <button
        onClick={() => {
          setNumber(parseInt(number) + 1);
        }}
        className="cursor-pointer rounded-md py-2 text-center text-lg active:bg-blue-400"
      >
        <AddIcon />
      </button>
    </div>
  );
}

export default FlyCT;
