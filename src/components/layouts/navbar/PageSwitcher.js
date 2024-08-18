import { Link, useNavigate } from 'react-router-dom';
import Login from '../../pages/Login';
import { useState, useEffect, useRef } from 'react';
import Avatar from 'react-avatar';
import Modal from '../../utils/Modal';
import { useLoginContext } from '../../context/login/LoginContext';
import { SlHandbag } from 'react-icons/sl';
import { CiLogout } from 'react-icons/ci';

function PageSwitcher({ topRightNavItem }) {
  const { isAuthenticated, setIsAuthenticated } = useLoginContext();
  const [name, setName] = useState('');

  const { component, navigateTo, icon, title, subtitle } = topRightNavItem;
  const [openModal, setOpenModal] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    const authToken = sessionStorage.getItem('authToken');
    if (storedName && authToken) {
      setName(storedName);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  function handleAvatarClick() {
    if (isAuthenticated) {
      setShowLogoutPopup(!showLogoutPopup);
    } else {
      setOpenModal(true);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('email');
    setIsAuthenticated(false);
    navigate('/flights');
    setShowLogoutPopup(false);
    setOpenModal(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogoutPopup(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  function handleModalOpen() {
    if (isAuthenticated) {
      setOpenModal(false);
      navigate('/trips');
    } else {
      setOpenModal(true);
    }
  }

  return (
    <>
      {component === 'selectableItem' && title === 'My Trips' && (
        <div onClick={handleModalOpen}>
          <div
            className={`${
              title === 'My Trips'
                ? 'cursor-pointer border-none'
                : 'border-r-2 border-dotted'
            } flex items-center gap-4 px-3`}
          >
            {icon}
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-[.65rem] font-normal text-gray-300">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
      {component === 'selectableItem' && title !== 'My Trips' && (
        <Link to={navigateTo}>
          <div
            className={`${
              title === 'My Trips' ? 'border-none' : 'border-r-2 border-dotted'
            } flex items-center gap-4 px-3`}
          >
            {icon}
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-[.65rem] font-normal text-gray-300">
                {subtitle}
              </p>
            </div>
          </div>
        </Link>
      )}

      {component === 'dropDownMenuItem' && (
        <div className="relative">
          <div
            className={`flex cursor-pointer items-center rounded p-2 ${
              !isAuthenticated ? 'gap-8' : 'gap-2'
            }`}
            style={
              isAuthenticated
                ? { background: 'none' }
                : { background: 'linear-gradient(93deg, #53b2fe, #065af3)' }
            }
            onClick={handleAvatarClick}
          >
            <div className="flex items-center gap-2 px-1">
              {!isAuthenticated ? (
                <p className="flex h-6 w-6 items-center justify-center rounded-full border bg-white font-cedarville text-base font-medium text-blue-500">
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
                <p className="text-[0.65rem] font-bold">{subtitle}</p>
              ) : (
                <p className="text-[0.65rem] font-bold">{name}</p>
              )}
            </div>
            {icon}
          </div>
          {showLogoutPopup && (
            <div
              ref={popupRef}
              className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg z-30"
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
      )}

      <Modal open={openModal} close={() => setOpenModal(false)}>
        <Login close={() => setOpenModal(false)} />
      </Modal>
    </>
  );
}

export default PageSwitcher;
