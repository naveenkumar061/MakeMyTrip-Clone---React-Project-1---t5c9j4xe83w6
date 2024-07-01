// Import statements ordered by path, third-party libraries, context, and data
import Spinner from "../../../ui/Spinner";
import FlightsindividualInformationList from "./FlightsindividualInformationList";

// Component definition for displaying individual flight information
function FlightsIndividualInformation({ flightsList }) {
  // Get the length of the flights list
  const flightsListLength = flightsList?.length;

  // Display a spinner if flightsList is not yet available
  if (!flightsList) return <Spinner addOuterClass="addOuterClass" />;

  // Display a message if there are no available flights
  if (flightsListLength === 0)
    return (
      <p className="w-[60vw] rounded-md bg-yellow-200 p-4 text-center text-lg font-bold text-red-600 shadow-md">
        Please select a different filter, source, destination, or date and try
        again, as there are no available flights.
      </p>
    );

  // Render the list of available flights
  return (
    <div className="relative bottom-24 z-[1] w-[60vw] shadow-lg">
      {flightsList?.map((flight, index) => (
        <FlightsindividualInformationList
          key={index}
          index={index}
          listLength={flightsListLength}
          flight={flight}
        />
      ))}
    </div>
  );
}

export default FlightsIndividualInformation;
