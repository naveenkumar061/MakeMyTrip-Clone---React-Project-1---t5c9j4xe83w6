import { NavLink } from 'react-router-dom';
import { useToggle } from '../../context/togglebar/ToggleContext';

function NavScl({ scrollLeftRightOptionsItem }) {
  const { name, icon, path } = scrollLeftRightOptionsItem;
  const { handleToggle } = useToggle();

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${
          isActive ? 'text-blue-500' : ''
        } duration-5000 flex w-[50px] flex-col items-start overflow-hidden text-ellipsis whitespace-nowrap transition ease-linear`
      }
      onClick={handleToggle}
    >
      <p className="pl-2 max-450:p-0">{icon}</p>
      <p className="max-650:text-xs max-550:hidden">{name}</p>
    </NavLink>
  );
}

export default NavScl;
