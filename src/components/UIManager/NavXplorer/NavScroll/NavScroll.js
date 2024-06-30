// Library imports
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";

// Component imports
import NavLeftFlow from "./NavLeftFlow/NavLeftFlow";

// Context imports
import { useNavToggleContext } from "../../../WebDevGuru/Navbar/NavToggleContext";

// Data imports
import { navTopRightData } from "../../../Resources/InfoSummary/NavPanel/NavTopRightData";

function NavScroll() {
  const { navigateTo, title, subtitle } = navTopRightData[3];
  const { toggle, handleToggle } = useNavToggleContext();

  return (
    <div
      className={`fixed top-0 z-20 flex w-full bg-white p-4 text-slate-500 shadow-md max-450:flex-row ${toggle ? "items-center justify-between" : "justify-around max-1050:flex-col max-1050:items-center max-650:items-start"}`}
    >
      {toggle && <HiBars3 onClick={handleToggle} />}

      {!toggle && <NavLeftFlow />}

      <Link to={navigateTo}>
        <div className="flex gap-2 p-2 max-1050:w-full">
          <p
            className={`${!toggle && "max-450:h-6 max-450:w-10 max-450:text-sm"} h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-center font-cedarville text-base font-normal text-white`}
          >
            {title}
          </p>
          <p className="font-semibold text-black max-450:flex max-450:items-center max-450:justify-center max-450:text-sm max-450:font-normal">
            {subtitle}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default NavScroll;
