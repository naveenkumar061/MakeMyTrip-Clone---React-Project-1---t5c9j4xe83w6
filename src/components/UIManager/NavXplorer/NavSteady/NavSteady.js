// Importing components
import NavPeakTop from "./NavPeakTop/NavPeakTop";
import NavPeakDown from "./NavPeakDown/NavPeakDown";

// NavSteady component definition
function NavSteady() {
  return (
    <div>
      {/* Render the top navigation component */}
      <NavPeakTop />
      {/* Render the bottom navigation component */}
      <NavPeakDown />
    </div>
  );
}

// Exporting NavSteady component as default
export default NavSteady;
