import { Outlet } from 'react-router-dom';
import NavScrollMainBar from './navbar/NavScrollMainBar';

function SubLayout({ children }) {
  return (
    <div className="flex flex-col">
      <NavScrollMainBar />
      <Outlet />
    </div>
  );
}

export default SubLayout;
