import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Offers from '../features/offers/Offers';
import Footer from '../features/footer/Footer';

function AppLayout() {
  return (
    <div>
      <div>
        <Navbar />
        <Outlet />
      </div>
      <Offers />
      <Footer />
    </div>
  );
}

export default AppLayout;
