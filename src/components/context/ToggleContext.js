// React import statements
import { createContext, useContext, useEffect, useState } from "react";

// Context creation for toggle functionality
const ToggleContext = createContext();

// Provider component to manage toggle state and provide context value
function ToggleProvider({ children }) {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1050) setToggle(true);
      if (window.innerWidth > 1050) setToggle(false);
    }

    // Initial call to set the toggle based on current window size
    handleResize();

    // Event listener to handle window resize and update toggle state
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to toggle the state
  function handleToggle() {
    if(window.innerWidth <= 1050) setToggle((toggle) => !toggle);
    else setToggle(false)
  }

  return (
    <ToggleContext.Provider value={{ setToggle, toggle, handleToggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

// Custom hook to use the ToggleContext
function useToggle() {
  const context = useContext(ToggleContext);
  if (context === undefined)
    throw new Error("ToggleContext was used outside of ToggleProvider");
  return context;
}

export { useToggle, ToggleProvider };
