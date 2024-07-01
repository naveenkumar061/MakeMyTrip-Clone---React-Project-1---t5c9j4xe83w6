// External imports from libraries
import { Link } from "react-router-dom";

// Internal imports
import primaryLogo from "../../../../data/Images/Logo/logommt.png";
import NavFixedMainTopRight from "./navfixedmaintopright/NavFixedMainTopRight";

// Functional component for the fixed main top navigation
function NavFixedMainTop() {
  return (
    <div className="flex items-center justify-around pt-2">
      {/* Link component from react-router-dom to navigate to the home page */}
      <Link to="/">
        {/* Image tag displaying the primary logo */}
        <img alt="primaryLogo" src={primaryLogo} className="h-10" />
      </Link>
      {/* Component for the top right menu */}
      <NavFixedMainTopRight />
    </div>
  );
}

// Exporting the component as the default export
export default NavFixedMainTop;
