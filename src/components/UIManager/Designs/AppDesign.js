// Library imports
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Component imports
import NavSteady from "../NavXplorer/NavSteady/NavSteady";
import NavScroll from "../NavXplorer/NavScroll/NavScroll";
import Offers from "../../VitalRoute/Offers";
import Footer from "../Footer";

// Data imports
import backgroundImage from "../../Resources/InfoPics/Background/bg-image.jpeg";

function AppDesign({ children }) {
  // State to control visibility of fixed and scrollable navigation bars
  const [showNavFixedMainBar, setShowNavFixedMainBar] = useState(true);
  const [showNavScrollMainBar, setShowNavScrollMainBar] = useState(false);

  useEffect(() => {
    // Handle window resize
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

    // Handle window scroll
    function handleScroll() {
      const height = window.scrollY;
      const width = window.innerWidth;
      if (height >= 130 || (width <= 1350 && height >= 0)) {
        setShowNavScrollMainBar(true);
      } else {
        setShowNavScrollMainBar(false);
      }
    }

    // Initial setup
    handleResize();
    handleScroll();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative flex flex-col">
      <div
        className="h-screen bg-cover bg-no-repeat text-white max-1250:h-[115vh]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Render fixed or scrollable navigation bars based on state */}
        {showNavFixedMainBar && <NavSteady />}
        {showNavScrollMainBar && <NavScroll />}
        <Outlet />
      </div>
      {/* Render offers and footer */}
      <Offers />
      <Footer />
    </div>
  );
}

export default AppDesign;
