import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../context/login/LoginContext';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useLoginContext();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate, setIsAuthenticated]);

  if (isAuthenticated) return children;
  return null;
}

export default ProtectedRoute;
