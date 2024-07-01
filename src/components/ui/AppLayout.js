import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Import Components
import NavFixedMainBar from "./navbar/navfixedmainbar/NavFixedMainBar";
import NavScrollMainBar from "./navbar/navscrollmainbar/NavScrollMainBar";
import Offers from "../pages/Offers";
import Footer from "./Footer";

// Import Data
import backgroundImage from "../data/Images/Background/bg-image.jpeg";

function AppLayout({ children }) {
  // State variables to manage visibility of navigation bars
  const [showNavFixedMainBar, setShowNavFixedMainBar] = useState(true);
  const [showNavScrollMainBar, setShowNavScrollMainBar] = useState(false);

  // Effect to handle window resize and scroll events
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
      if (height >= 130 || (width <= 1350 && height >= 0)) {
        setShowNavScrollMainBar(true);
      } else {
        setShowNavScrollMainBar(false);
      }
    }

    // Initial setup
    handleResize();
    handleScroll();

    // Event listeners for resize and scroll
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="relative flex flex-col">
      {/* Background image container */}
      <div
        className="h-screen bg-cover bg-no-repeat text-white max-1250:h-[115vh]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Conditionally render fixed and scrollable navigation bars */}
        {showNavFixedMainBar && <NavFixedMainBar />}
        {showNavScrollMainBar && <NavScrollMainBar />}

        {/* Render nested routes */}
        <Outlet />
      </div>

      {/* Render Offers component */}
      <Offers />

      {/* Render Footer component */}
      <Footer />
    </div>
  );
}

export default AppLayout;
