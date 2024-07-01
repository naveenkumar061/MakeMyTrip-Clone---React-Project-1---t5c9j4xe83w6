// Import necessary components from react-router-dom
import { NavLink } from "react-router-dom";

// Functional component to render a single dropdown list item
function NavFixedMainDownList({ dropdownListItem }) {
  // Destructure name, icon, and path from dropdownListItem
  const { name, icon, path } = dropdownListItem;

  return (
    // NavLink component renders a link with dynamic classNames based on whether it is active or not
    <NavLink
      to={path}
      className={({ isActive }) =>
        // Dynamic class based on isActive status
        `${isActive ? "mb-px border-b-4 border-blue-500 font-bold text-blue-500" : "text-gray-700"} duration-5000 flex h-24 
      w-1/2 flex-col items-center text-center transition ease-linear`
      }
    >
      {/* Display the icon */}
      <p className="text-2xl">{icon}</p>
      {/* Display the name */}
      <p>{name}</p>
    </NavLink>
  );
}

// Export the component as default
export default NavFixedMainDownList;
