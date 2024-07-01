// Imports from third-party libraries
import React from "react";

// Imports related to data and context
import { timePeriodDeparture } from "../../../data/Info/timeperioddeparture/TimePeriodDeparture";

// Component definition
function FilghtFilterTiming({ filterItems, onAddFilter }) {
  // Retrieve time periods from imported data
  const timePeriodsDeparture = timePeriodDeparture;

  // Function to handle click on time period div
  function handleDivClick(timePeriod) {
    console.log(timePeriod);
    const isSelected = filterItems.includes(timePeriod);
    onAddFilter(timePeriod, !isSelected);
  }

  return (
    <div className="flex items-center justify-between">
      {timePeriodsDeparture?.map((period, index) => (
        <div
          key={period.value}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 p-1 ${
            filterItems?.includes(period.value) ? "bg-blue-500" : ""
          }`}
          onClick={() => handleDivClick(period.value)}
        >
          {/* Image related to each departure time period */}
          <img
            src={require(`../../../data/Images/DepartureTime/${period.img}`)}
            alt={period.label}
            className="h-8"
          />
          {/* Label for the departure time period */}
          <p className="text-[0.5rem] font-bold">{period.label}</p>
        </div>
      ))}
    </div>
  );
}

// Exporting the component as default
export default FilghtFilterTiming;
