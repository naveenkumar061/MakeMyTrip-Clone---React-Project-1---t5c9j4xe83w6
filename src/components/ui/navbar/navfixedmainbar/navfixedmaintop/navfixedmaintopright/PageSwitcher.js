// Import necessary modules from react-router-dom first, then other libraries or components
import { Link } from "react-router-dom";

// Define the functional component PageSwitcher that accepts topRightNavItem as a prop
function PageSwitcher({ topRightNavItem }) {
  // Destructure properties from topRightNavItem
  const { component, navigateTo, icon, title, subtitle } = topRightNavItem;

  // Render different UI based on the component type
  return (
    <>
      {/* Render if component is "selectableItem" */}
      {component === "selectableItem" && (
        <Link to={navigateTo}>
          <div
            // Apply different styles based on the title property
            className={`${
              title === "My Trips" ? "border-none" : "border-r-2 border-dotted"
            } flex items-center gap-4 px-3`}
          >
            {/* Display the icon */}
            {icon}
            <div>
              {/* Display the title and subtitle */}
              <p className="font-semibold">{title}</p>
              <p className="text-[.65rem] font-normal text-gray-300">
                {subtitle}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Render if component is "dropDownMenuItem" */}
      {component === "dropDownMenuItem" && (
        <Link to={navigateTo}>
          <div
            // Apply specific styles for the dropDownMenuItem component
            className="flex items-center gap-8 rounded p-2"
            style={{ background: "linear-gradient(93deg, #53b2fe, #065af3)" }}
          >
            <div className="flex items-center gap-2 px-1">
              {/* Display a styled circle with the title */}
              <p className="flex h-6 w-6 items-center justify-center rounded-full border bg-white font-cedarville text-base font-medium text-blue-500">
                {title}
              </p>
              <p className="text-[0.65rem] font-bold">{subtitle}</p>
            </div>
            {/* Display the icon */}
            {icon}
          </div>
        </Link>
      )}
    </>
  );
}

// Export the PageSwitcher component as default
export default PageSwitcher;
