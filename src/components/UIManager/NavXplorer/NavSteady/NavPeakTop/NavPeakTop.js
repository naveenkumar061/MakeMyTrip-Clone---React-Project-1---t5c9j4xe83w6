// Importing libraries
import { Link } from "react-router-dom";

// Importing data and assets
import primaryLogo from "../../../../Resources/InfoPics/Logo/logommt.png";

// Importing components
import NavTopRigt from "./NavTopRigt/NavTopRigt";

// NavPeakTop component to display the top navigation bar
function NavPeakTop() {
  return (
    <div className="flex items-center justify-around pt-2">
      {/* Link to the home page with the primary logo */}
      <Link to="/">
        <img alt="primaryLogo" src={primaryLogo} className="h-10" />
      </Link>
      {/* Component displaying the right side of the top navigation bar */}
      <NavTopRigt />
    </div>
  );
}

export default NavPeakTop;
