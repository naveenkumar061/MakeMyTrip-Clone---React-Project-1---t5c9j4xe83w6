import NavExtendLeftRightList from "./NavExtendLeftRightList"; // Importing local component

import { navDropWise } from "../../../../../Resources/InfoSummary/NavPanel/NavDropwise"; // Importing data source

// Function component to render navigation items
function NavExtendLeftRight() {
  return (
    <div className="flex gap-4 max-550:gap-0 max-450:flex-col max-450:gap-2">
      {" "}
      {/* Container for navigation items */}
      {navDropWise.map(
        (
          navDropWiseItem,
          index, // Mapping through navigation data
        ) => (
          <NavExtendLeftRightList
            key={index}
            navDropWiseItem={navDropWiseItem}
          /> // Rendering each navigation item
        ),
      )}
    </div>
  );
}

export default NavExtendLeftRight; // Exporting NavExtendLeftRight component
