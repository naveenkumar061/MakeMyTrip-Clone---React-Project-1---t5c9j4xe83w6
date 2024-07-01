// Importing necessary icons from 'react-icons' library
import { BsFillSuitcaseFill } from "react-icons/bs"; // Importing suitcase icon from bootstrap icons
import { FaAngleDown } from "react-icons/fa"; // Importing angle down icon from font-awesome icons
import { LuFileKey } from "react-icons/lu"; // Importing file key icon from lucide icons
import { IoBagSharp } from "react-icons/io5"; // Importing bag icon from ionicons

// Defining an array of objects to represent menu items for the top-right menu
export const toprightmenudatalist = [
  {
    component: "selectableItem",
    navigateTo: "/yettocome",
    icon: (
      <LuFileKey className="h-8 w-8 rounded-full border border-gray-700 bg-stone-600 fill-amber-400 p-1 text-lg text-black" />
    ), // Icon with custom styles
    title: "List your property",
    subtitle: "Start earning today!",
  },
  {
    component: "selectableItem",
    navigateTo: "/yettocome",
    icon: <IoBagSharp className="h-6 w-6 fill-orange-500" />, // Icon with custom styles
    title: "Introducing myBiz",
    subtitle: "Business Travel Solution",
  },
  {
    component: "selectableItem",
    navigateTo: "/login",
    icon: <BsFillSuitcaseFill className="h-6 w-6 fill-amber-400" />, // Icon with custom styles
    title: "My Trips",
    subtitle: "Manage your bookings",
  },
  {
    component: "dropDownMenuItem",
    navigateTo: "/login",
    icon: <FaAngleDown className="h-4" />, // Icon with custom styles
    title: "my",
    subtitle: "Login or Create Account",
  },
];
