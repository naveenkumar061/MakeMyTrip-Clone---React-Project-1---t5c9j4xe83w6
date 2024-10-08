import { HiBars3 } from 'react-icons/hi2';
import { useState, useRef, useEffect } from 'react';
import Avatar from 'react-avatar';
import { useToggle } from '../../context/togglebar/ToggleContext';
import { toprightmenudatalist } from '../../assets/data/TopRightMenuDataList';
import NavScrollMainBarLeft from './NavScrollMainBarLeft';
import Modal from '../../utils/Modal';
import Login from '../../pages/Login';
import { useLoginContext } from '../../context/login/LoginContext';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { SlHandbag } from 'react-icons/sl';

function NavScrollMainBar() {
  const { isAuthenticated, setIsAuthenticated } = useLoginContext();
  const topRightMenuDataList = toprightmenudatalist;
  const { title, subtitle } = topRightMenuDataList[3];
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const popupRef = useRef(null);
  const [name, setName] = useState('');

  const { toggle, handleToggle } = useToggle();
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) setName(sessionStorage.getItem('name'));
  }, [isAuthenticated]);

  function handleLogout() {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('authtoken');
    sessionStorage.removeItem('email');
    setShowLogoutPopup(false);
    setIsAuthenticated(false);
    navigate('/flights');
  }

  function handleAvatarClick() {
    if (isAuthenticated) {
      setOpenModal(false);
      setShowLogoutPopup(!showLogoutPopup);
    } else {
      setOpenModal(true);
    }
  }

  return (
    <div
      className={`fixed top-0 z-20 flex w-full bg-white p-4 text-slate-500 shadow-md max-450:flex-row ${
        toggle
          ? 'items-center justify-between'
          : 'justify-around max-1050:flex-col max-1050:items-center max-650:items-start'
      }`}
    >
      {toggle && <HiBars3 onClick={handleToggle} />}
      {!toggle && <NavScrollMainBarLeft />}
      <div className="relative cursor-pointer" onClick={handleAvatarClick}>
        <div className="flex gap-2 p-2 max-1050:w-full">
          {!isAuthenticated ? (
            <p
              className={`${
                !toggle && 'max-450:h-6 max-450:w-10 max-450:text-sm'
              } h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-center font-cedarville text-base font-normal text-white`}
            >
              {title}
            </p>
          ) : (
            <Avatar
              name={name}
              size={25}
              round={true}
              textSizeRatio={2}
              className="cursor-pointer hover:opacity-70"
            />
          )}
          {!isAuthenticated ? (
            <p className="font-semibold text-black max-450:flex max-450:items-center max-450:justify-center max-450:text-sm max-450:font-normal">
              {subtitle}
            </p>
          ) : (
            <p className="font-semibold text-black max-450:flex max-450:items-center max-450:justify-center max-450:text-sm max-450:font-normal">
              {name}
            </p>
          )}
        </div>
        {showLogoutPopup && (
          <div
            ref={popupRef}
            className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg border border-slate-400"
            style={{ top: '100%' }}
          >
            <Link
              to="/trips"
              className="w-full border-b border-slate-400 p-2 justify-center text-left text-gray-700 hover:bg-blue-100 flex items-center gap-4 font-bold text-lg"
            >
              <SlHandbag className="text-lg" />
              My Trips
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center text-lg gap-4 font-bold w-full p-2 justify-center text-left text-gray-700 hover:bg-blue-100"
            >
              <CiLogout className="text-2xl" />
              Logout
            </button>
          </div>
        )}
      </div>
      <Modal open={openModal} close={() => setOpenModal(false)}>
        <Login close={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}

export default NavScrollMainBar;
