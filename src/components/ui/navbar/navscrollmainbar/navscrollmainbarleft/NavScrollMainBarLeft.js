// Third-party libraries
import { Link } from "react-router-dom";

// Context
import { useToggle } from "../../../../context/ToggleContext";

// Data
import scrollLogo from "../../../../data/Images/Logo/logoscroll.png";

// Components
import NavSBLR from "./navscrollmainbarleftright/NavSBLR";

function NavScrollMainBarLeft() {
  // Extracting handleToggle from useToggle context
  const { handleToggle } = useToggle();

  return (
    // Container div with responsive classes
    <div className="flex items-center gap-8 max-1050:w-full max-1050:justify-between max-800:flex-col max-800:gap-2 max-450:items-start">
      {/* Logo with link to home and toggle functionality */}
      <Link to="/" onClick={handleToggle}>
        <img alt="scrollLogo" src={scrollLogo} className="h-10" />
      </Link>
      {/* Additional component for the right side of the nav bar */}
      <NavSBLR />
    </div>
  );
}

export default NavScrollMainBarLeft;
