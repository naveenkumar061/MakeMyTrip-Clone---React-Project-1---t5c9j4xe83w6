import { createContext, useContext, useEffect, useState } from 'react';

const ToggleContext = createContext();

function ToggleProvider({ children }) {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1050) setToggle(true);
      if (window.innerWidth > 1050) setToggle(false);
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleToggle() {
    if (window.innerWidth <= 1050) setToggle((toggle) => !toggle);
    else setToggle(false);
  }

  const content = { setToggle, toggle, handleToggle };

  return (
    <ToggleContext.Provider value={content}>{children}</ToggleContext.Provider>
  );
}

function useToggle() {
  const context = useContext(ToggleContext);
  if (context === undefined)
    throw new Error('ToggleContext was used outside of ToggleProvider');
  return context;
}

export { useToggle, ToggleProvider };
