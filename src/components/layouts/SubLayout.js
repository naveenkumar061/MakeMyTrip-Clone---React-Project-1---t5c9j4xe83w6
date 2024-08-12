import { Outlet } from 'react-router-dom';
import NavScrollMainBar from './navbar/NavScrollMainBar';

function SubLayout() {
  return (
    <div>
      <NavScrollMainBar />
      <Outlet />
    </div>
  );
}

export default SubLayout;
