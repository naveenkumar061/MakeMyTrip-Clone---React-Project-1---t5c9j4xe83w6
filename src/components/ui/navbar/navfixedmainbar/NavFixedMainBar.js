// Import React library (if using React, though not explicitly shown here)
import React from "react";

// Import components from relative paths
import NavFixedMainTop from "./navfixedmaintop/NavFixedMainTop";
import NavFixedMainDown from "./navfixedmaindown/NavFixedMainDown";

/**
 * NavFixedMainBar Component
 *
 * This component serves as the main navigation bar, consisting of two sub-components:
 * 1. NavFixedMainTop - The top part of the fixed navigation bar
 * 2. NavFixedMainDown - The bottom part of the fixed navigation bar
 *
 * The two sub-components are rendered inside a parent div.
 */
function NavFixedMainBar() {
  return (
    <div>
      <NavFixedMainTop />
      <NavFixedMainDown />
    </div>
  );
}

export default NavFixedMainBar;
