import { createContext, useContext, useEffect, useState } from "react";

// Create a context for NavToggle
const NavToggleContext = createContext();

// Provider component to manage NavToggle state
function NavToggleProvider({ children }) {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    // Function to handle window resize and update toggle state
    function handleResize() {
      if (window.innerWidth <= 1050) setToggle(true);
      if (window.innerWidth > 1050) setToggle(false);
    }

    // Initial call to set the correct toggle state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to manually toggle the state
  function handleToggle() {
    if (window.innerWidth <= 1050) setToggle((toggle) => !toggle);
    else setToggle(false);
  }

  return (
    <NavToggleContext.Provider value={{ toggle, setToggle, handleToggle }}>
      {children}
    </NavToggleContext.Provider>
  );
}

// Hook to use NavToggle context
function useNavToggleContext() {
  const context = useContext(NavToggleContext);
  if (context === undefined)
    throw new Error("NavToggleContext was used outside of NavToggleProvider");
  return context;
}

export { NavToggleProvider, useNavToggleContext };
