// Import React dependencies
import React from "react";

// Import components
import NavFixedMainDownList from "./NavFixedMainDownList";

// Import data
import { dropdownEntries } from "../../../../data/Info/navbar/DropdownEntries";

function NavFixedMainDown() {
  // Assign the dropdown entries to a local variable
  const dropdownOptions = dropdownEntries;

  // Render the dropdown menu
  return (
    <div className="relative z-10 mx-72 mt-16 flex items-center justify-between gap-8 rounded-md border border-gray-200 bg-white px-8 pt-4 text-gray-700 shadow-md">
      {dropdownOptions.map((dropdownListItem, index) => (
        <NavFixedMainDownList key={index} dropdownListItem={dropdownListItem} />
      ))}
    </div>
  );
}

export default NavFixedMainDown;
