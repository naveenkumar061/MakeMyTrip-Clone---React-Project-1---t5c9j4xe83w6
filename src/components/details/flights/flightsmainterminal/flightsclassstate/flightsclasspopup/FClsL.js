import { useFlightsMainContext } from "../../../../../context/Flights/FlightsMainContext";

function FClsL({ flightClassListItem }) {
  // Destructure context values
  const { setClassType, classType } = useFlightsMainContext();

  return (
    // Container div with dynamic styling and click handler
    <div
      onClick={() => setClassType(flightClassListItem)}
      className={`cursor-pointer rounded-md border border-gray-400 p-1 text-sm font-normal ${flightClassListItem === classType && "bg-blue-400 font-medium text-white hover:text-slate-800"} ${flightClassListItem === "sub" && "w-[80%]"} hover:text-slate-400`}
    >
      {flightClassListItem}
    </div>
  );
}

export default FClsL;
