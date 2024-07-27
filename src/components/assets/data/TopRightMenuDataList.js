import { BsFillSuitcaseFill } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa';
import { LuFileKey } from 'react-icons/lu';
import { IoBagSharp } from 'react-icons/io5';

export const toprightmenudatalist = [
  {
    component: 'selectableItem',
    navigateTo: '/yettocome',
    icon: (
      <LuFileKey className="h-8 w-8 rounded-full border border-gray-700 bg-stone-600 fill-amber-400 p-1 text-lg text-black" />
    ),
    title: 'List your property',
    subtitle: 'Start earning today!',
  },
  {
    component: 'selectableItem',
    navigateTo: '/yettocome',
    icon: <IoBagSharp className="h-6 w-6 fill-orange-500" />,
    title: 'Introducing myBiz',
    subtitle: 'Business Travel Solution',
  },
  {
    component: 'selectableItem',
    navigateTo: '/login',
    icon: <BsFillSuitcaseFill className="h-6 w-6 fill-amber-400" />,
    title: 'My Trips',
    subtitle: 'Manage your bookings',
  },
  {
    component: 'dropDownMenuItem',
    navigateTo: '/login',
    icon: <FaAngleDown className="h-4" />,
    title: 'my',
    subtitle: 'Login or Create Account',
  },
];
