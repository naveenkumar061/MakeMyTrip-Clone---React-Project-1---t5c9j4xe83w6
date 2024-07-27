import { Outlet } from 'react-router-dom';
import Offers from '../features/offers/Offers';
import Footer from '../features/footer/Footer';
import backgroundImage from '../assets/images/bg-image.jpeg';
import { useEffect, useState } from 'react';
import NavFixedMainBar from './navbar/NavFixedMainBar';
import NavScrollMainBar from './navbar/NavScrollMainBar';

function AppLayout() {
  const [showNavFixedMainBar, setShowNavFixedMainBar] = useState(true);
  const [showNavScrollMainBar, setShowNavScrollMainBar] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width <= 1350) {
        setShowNavScrollMainBar(true);
        setShowNavFixedMainBar(false);
      } else {
        setShowNavScrollMainBar(false);
        setShowNavFixedMainBar(true);
      }
    }

    function handleScroll() {
      const height = window.scrollY;
      const width = window.innerWidth;
      if (height >= 150 || (width <= 1350 && height >= 0)) {
        setShowNavScrollMainBar(true);
      } else {
        setShowNavScrollMainBar(false);
      }
    }

    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-no-repeat text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {showNavFixedMainBar && <NavFixedMainBar />}
        {showNavScrollMainBar && <NavScrollMainBar />}
        {showNavScrollMainBar && <div className="mt-20"></div>}
        <Outlet />
      </div>
      <Offers />
      <Footer />
    </div>
  );
}

export default AppLayout;
