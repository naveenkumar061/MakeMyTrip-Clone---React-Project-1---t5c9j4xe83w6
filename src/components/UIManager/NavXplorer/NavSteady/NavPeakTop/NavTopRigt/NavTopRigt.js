import React from "react";
import { IN } from "country-flag-icons/react/3x2"; // Library import

import NavJump from "./NavJump"; // Component import
import { navTopRightData } from "../../../../../Resources/InfoSummary/NavPanel/NavTopRightData"; // Data import

function NavTopRight() {
  // Component for top right navigation
  return (
    <div className="flex items-center justify-center text-xs text-white">
      {/* Mapping through navigation data */}
      {navTopRightData.map((navTopRightDataItem, index) => (
        <NavJump key={index} navTopRightDataItem={navTopRightDataItem} />
      ))}
      {/* Country and language selector */}
      <div className="flex h-10 items-center rounded-[.25rem] bg-stone-600 p-2">
        <IN title="India" className="h-7 w-7 pr-2" /> {/* Indian flag icon */}
        <div className="flex text-white">
          {/* Language and currency abbreviations */}
          <p className="border-r-2 pr-1 text-xs">IN</p> {/* IN for language */}
          <p className="border-r-2 px-1 text-xs">ENG</p>{" "}
          {/* ENG for language */}
          <p className="pl-1 text-xs">INR</p> {/* INR for currency */}
        </div>
      </div>
    </div>
  );
}

export default NavTopRight; // Exporting NavTopRight component
