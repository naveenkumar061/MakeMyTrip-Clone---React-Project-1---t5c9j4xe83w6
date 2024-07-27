import { NavLink } from "react-router-dom";

function NavFixedMainDownList({ dropdownListItem }) {
  const { name, icon, path } = dropdownListItem;

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${isActive ? "mb-px border-b-4 border-blue-500 font-bold text-blue-500" : "text-gray-700"} duration-5000 flex h-24 
      w-1/2 flex-col items-center text-center transition ease-linear`
      }
    >
      <p className="text-2xl">{icon}</p>
      <p>{name}</p>
    </NavLink>
  );
}

export default NavFixedMainDownList;
