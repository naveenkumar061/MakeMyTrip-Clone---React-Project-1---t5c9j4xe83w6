import NavDescendList from "./NavDescendList"; // Import component from local file
import { navDropWise } from "../../../../Resources/InfoSummary/NavPanel/NavDropwise"; // Import data source

// Component for rendering a navigation dropdown
function NavPeakDown() {
  // Return JSX for the navigation dropdown container
  return (
    <div className="relative z-10 mx-72 mt-16 flex items-center justify-between gap-8 rounded-md border border-gray-200 bg-white px-8 pt-4 text-gray-700 shadow-md">
      {navDropWise.map((navDropWiseItem, index) => (
        // Render NavDescendList component for each item in navDropWise array
        <NavDescendList key={index} navDropWiseItem={navDropWiseItem} />
      ))}
    </div>
  );
}

export default NavPeakDown; // Export NavPeakDown component as default
