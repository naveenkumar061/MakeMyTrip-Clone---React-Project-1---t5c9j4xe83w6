// React Router DOM import for navigation links
import { NavLink } from "react-router-dom";

// Custom context hook for toggling functionality
import { useToggle } from "../../../../../context/ToggleContext";

/**
 * NavScrollMainBarLeftRightList Component
 * This component renders a navigation link with customizable text and icon.
 * It uses the NavLink component from React Router to handle active states and navigation.
 * The link appearance changes based on its active state.
 * On click, it triggers a toggle function from the ToggleContext.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.scrollLeftRightOptionsItem - Object containing name, icon, and path for the link
 * @param {string} props.scrollLeftRightOptionsItem.name - The name to display in the link
 * @param {ReactElement} props.scrollLeftRightOptionsItem.icon - The icon to display in the link
 * @param {string} props.scrollLeftRightOptionsItem.path - The navigation path for the link
 */

function NavScl({ scrollLeftRightOptionsItem }) {
  const { name, icon, path } = scrollLeftRightOptionsItem;
  const { handleToggle } = useToggle();

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${isActive ? "text-blue-500" : ""} duration-5000 flex w-[50px] flex-col items-start overflow-hidden text-ellipsis whitespace-nowrap transition ease-linear`
      }
      onClick={handleToggle}
    >
      <p className="pl-2 max-450:p-0">{icon}</p>
      <p className="max-650:text-xs max-550:hidden">{name}</p>
    </NavLink>
  );
}

export default NavScl;
