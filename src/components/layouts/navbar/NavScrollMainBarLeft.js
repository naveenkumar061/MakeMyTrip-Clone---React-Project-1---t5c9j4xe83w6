import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NavSBLR from './NavSBLR';
import { useToggle } from '../../context/togglebar/ToggleContext';
import scrollLogo from '../../assets/images/logoscroll.png';

function NavScrollMainBarLeft() {
  const { handleToggle } = useToggle();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex items-center gap-8 max-1050:w-full max-1050:justify-between max-800:flex-col max-800:gap-2 max-450:items-start">
      <Link to="/" onClick={handleToggle}>
        <img alt="scrollLogo" src={scrollLogo} className="h-10" />
      </Link>
      <NavSBLR />
    </div>
  );
}

export default NavScrollMainBarLeft;
