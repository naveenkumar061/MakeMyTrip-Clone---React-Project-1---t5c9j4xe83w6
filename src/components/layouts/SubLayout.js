import { Outlet } from 'react-router-dom';
import NavScrollMainBar from './navbar/NavScrollMainBar';

function SubLayout({ children }) {
  return (
    <div>
      <NavScrollMainBar />
      <Outlet />
    </div>
  );
}

export default SubLayout;
