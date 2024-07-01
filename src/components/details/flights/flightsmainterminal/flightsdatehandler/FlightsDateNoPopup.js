// Importing the required context from FlightsMainContext
import { useFlightsMainContext } from "../../../../context/Flights/FlightsMainContext";

// Function component to display flight date without a popup
function FlightsDateNoPopup() {
  // Destructuring the year, weekday, month, and day from the FlightsMainContext
  const { year, weekday, month, day } = useFlightsMainContext();

  return (
    <div>
      {/* Displaying the day in large bold text, followed by the month and year in slightly smaller, normal weight text */}
      <h1 className="text-3xl font-bold">
        {day}
        <span className="pl-2 text-2xl font-normal">
          {month}'{year}
        </span>
      </h1>
      {/* Displaying the weekday */}
      <p>{weekday}</p>
    </div>
  );
}

// Exporting the component as the default export
export default FlightsDateNoPopup;
