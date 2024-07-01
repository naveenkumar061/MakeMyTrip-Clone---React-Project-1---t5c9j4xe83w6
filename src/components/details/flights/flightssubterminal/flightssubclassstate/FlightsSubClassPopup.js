import { useFlightsMainContext } from "../../../../context/Flights/FlightsMainContext";
import FlightsSubClassClasses from "./FlightsSubClassClasses";
import FlightsSubClassTravellers from "./FlightsSubClassTravellers";

function FlightsSubClassPopup() {
  const { handleClassClose } = useFlightsMainContext();

  return (
    <div
      className={`absolute z-10 flex h-auto w-full flex-col gap-4 rounded-none border border-gray-400 bg-white p-4 text-black`}
    >
      <div className="flex items-center justify-between">
        <h3>Travellers</h3>
        <FlightsSubClassTravellers />
      </div>
      <div className="flex flex-col gap-2">
        <h3>Choose Class Type</h3>
        <FlightsSubClassClasses />
      </div>
      <div
        className="flex h-8 w-1/4 cursor-pointer items-center justify-center self-end rounded-full bg-gradient-to-r from-blue-300 to-blue-500 text-center text-white"
        onClick={handleClassClose}
      >
        Apply
      </div>
    </div>
  );
}

export default FlightsSubClassPopup;
