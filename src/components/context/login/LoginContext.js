import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const content = { isAuthenticated, setIsAuthenticated };
  return (
    <LoginContext.Provider value={content}>{children}</LoginContext.Provider>
  );
}

function useLoginContext() {
  const context = useContext(LoginContext);
  if (context === undefined)
    throw new Error('LoginContext was used outside of LoginProvider');
  return context;
}

export { LoginProvider, useLoginContext };
