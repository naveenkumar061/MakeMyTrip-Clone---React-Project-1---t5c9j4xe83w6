import { Link } from "react-router-dom"; // Import from React Router DOM for navigation
import scrollLogo from "../../../../Resources/InfoPics/Logo/logoscroll.png"; // Import scrollLogo image
import { useNavToggleContext } from "../../../../WebDevGuru/Navbar/NavToggleContext"; // Import NavToggleContext custom hook
import NavExtendLeftRight from "./NavExtendLeftRight/NavExtendLeftRight"; // Import NavExtendLeftRight component

function NavLeftFlow() {
  const { handleToggle } = useNavToggleContext(); // Access handleToggle function from NavToggleContext

  // Render the navigation bar with logo and extended left-right navigation
  return (
    <div className="flex items-center gap-8 max-1050:w-full max-1050:justify-between max-800:flex-col max-800:gap-2 max-450:items-start">
      <Link to="/" onClick={handleToggle}>
        <img alt="scrollLogo" src={scrollLogo} className="h-10" />
      </Link>
      <NavExtendLeftRight />
    </div>
  );
}

export default NavLeftFlow; // Export NavLeftFlow component as default
