import { AiOutlineInsurance } from 'react-icons/ai';
import { FaCar, FaHotel, FaUmbrella } from 'react-icons/fa';
import { FaBusSimple, FaTrainSubway } from 'react-icons/fa6';
import { GiCommercialAirplane } from 'react-icons/gi';
import { GrCurrency } from 'react-icons/gr';
import { MdOutlineHomeWork } from 'react-icons/md';

const iconStyle = 'max-550:h-6 w-6';

export const dropdownEntries = [
  {
    name: 'Flights',
    icon: <GiCommercialAirplane className={iconStyle} />,
    path: '/flights',
  },
  {
    name: 'Hotels',
    icon: <FaHotel className={iconStyle} />,
    path: '/hotels',
  },
  {
    name: 'HomeStays & Villas',
    icon: <MdOutlineHomeWork className={iconStyle} />,
    path: '/homestays',
  },
  {
    name: 'Holiday Packages',
    icon: <FaUmbrella className={iconStyle} />,
    path: '/holidays-india',
  },
  {
    name: 'Trains',
    icon: <FaTrainSubway className={iconStyle} />,
    path: '/railways',
  },
  {
    name: 'Buses',
    icon: <FaBusSimple className={iconStyle} />,
    path: '/bus-tickets',
  },
  {
    name: 'Cabs',
    icon: <FaCar className={iconStyle} />,
    path: '/cabs',
  },
  {
    name: 'Forex Card & Currency',
    icon: <GrCurrency className={iconStyle} />,
    path: '/forex',
  },
  {
    name: 'Travel Insurance',
    icon: <AiOutlineInsurance className={iconStyle} />,
    path: '/insurance',
  },
];
