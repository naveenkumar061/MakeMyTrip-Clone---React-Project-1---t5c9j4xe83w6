import { Link } from 'react-router-dom';
import primaryLogo from '../../assets/images/logommt.png';
import NavFixedMainTopRight from './NavFixedMainTopRight';

function NavFixedMainTop() {
  return (
    <div className="flex items-center justify-around pt-2">
      <Link to="/">
        <img alt="primaryLogo" src={primaryLogo} className="h-10" />
      </Link>
      <NavFixedMainTopRight />
    </div>
  );
}

export default NavFixedMainTop;
