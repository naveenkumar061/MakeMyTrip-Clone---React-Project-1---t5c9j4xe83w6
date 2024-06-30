import { NavLink } from "react-router-dom"; // Import from React Router DOM
import { useNavToggleContext } from "../../../../../WebDevGuru/Navbar/NavToggleContext"; // Import custom hook for navbar toggle

// Component for individual navigation item in extended left-right list
function NavExtendLeftRightList({ navDropWiseItem }) {
  const { name, icon, path } = navDropWiseItem; // Destructure props
  const { handleToggle } = useNavToggleContext(); // Access toggle function from context

  // Render NavLink with dynamic class based on isActive state
  return (
    <NavLink
      to={path} // Link destination
      className={(
        { isActive }, // Dynamic class based on isActive state
      ) =>
        `${isActive ? "text-blue-500" : ""} duration-5000 flex w-[50px] flex-col items-start overflow-hidden text-ellipsis whitespace-nowrap transition ease-linear`
      }
      onClick={handleToggle} // Handle click event
    >
      <p className="pl-2 max-450:p-0">{icon}</p> {/* Icon display*/}
      <p className="max-650:text-xs max-550:hidden">{name}</p>
    </NavLink>
  );
}

export default NavExtendLeftRightList; // Export component
