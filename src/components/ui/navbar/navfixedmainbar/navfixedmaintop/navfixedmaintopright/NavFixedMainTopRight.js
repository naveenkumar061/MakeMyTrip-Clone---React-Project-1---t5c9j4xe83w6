// Importing necessary React components and data
import React from "react";

// Importing specific country flag component
import { IN } from "country-flag-icons/react/3x2";

// Importing custom component for page switching functionality
import PageSwitcher from "./PageSwitcher";

// Importing data list for top right menu navigation items
import { toprightmenudatalist } from "../../../../../data/Info/navbar/TopRightMenuDataList";

function NavFixedMainTopRight() {
  // Assigning imported data to a variable
  const topRightNavList = toprightmenudatalist;

  return (
    // Container for the entire top right navigation
    <div className="flex items-center justify-center text-xs text-white">
      {/* Mapping through the top right navigation items */}
      {topRightNavList.map((topRightNavItem, index) => (
        <PageSwitcher key={index} topRightNavItem={topRightNavItem} />
      ))}
      {/* Container for displaying country flag and language/currency */}
      <div className="flex h-10 items-center rounded-[.25rem] bg-stone-600 p-2">
        {/* Country flag component with title */}
        <IN title="India" className="h-7 w-7 pr-2" />
        {/* Container for displaying language and currency */}
        <div className="flex text-white">
          <p className="border-r-2 pr-1 text-xs">IN</p>
          <p className="border-r-2 px-1 text-xs">ENG</p>
          <p className="pl-1 text-xs">INR</p>
        </div>
      </div>
    </div>
  );
}

export default NavFixedMainTopRight;
