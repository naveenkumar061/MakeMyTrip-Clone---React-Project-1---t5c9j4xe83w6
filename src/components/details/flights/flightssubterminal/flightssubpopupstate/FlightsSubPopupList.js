import { PiAirplaneTakeoff } from "react-icons/pi";
import { useFlightsMainContext } from "../../../../context/Flights/FlightsMainContext";

function FlightsSubPopupList({ flightInfo, destination }) {
  const { chooseCity } = useFlightsMainContext();

  return (
    <div
      className="flex w-full flex-col p-2 hover:bg-gray-200"
      onClick={(e) => chooseCity(flightInfo.city, e, destination)}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <PiAirplaneTakeoff className="text-md" />
          <p className="font-normal text-gray-800">
            {flightInfo.city}, {flightInfo.country}
          </p>
        </div>
        <div className="text-gray-500">{flightInfo.iata_code}</div>
      </div>
    </div>
  );
}

export default FlightsSubPopupList;
