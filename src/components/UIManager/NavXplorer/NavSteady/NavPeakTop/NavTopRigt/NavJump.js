import React from "react";
import { Link } from "react-router-dom";

// Component for rendering navigation items based on type
function NavJump({ navTopRightDataItem }) {
  // Destructure properties from topRightNavItem
  const { component, navigateTo, icon, title, subtitle } = navTopRightDataItem;

  // Render selectable item component
  return (
    <>
      {component === "selectableItem" && (
        <Link to={navigateTo}>
          <div
            className={`${
              title === "My Trips" ? "border-none" : "border-r-2 border-dotted"
            } flex items-center gap-4 px-3`}
          >
            {icon}
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-[.65rem] font-normal text-gray-300">
                {subtitle}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Render dropdown menu item component */}
      {component === "dropDownMenuItem" && (
        <Link to={navigateTo}>
          <div
            className="flex items-center gap-8 rounded p-2"
            style={{ background: "linear-gradient(93deg, #53b2fe, #065af3)" }}
          >
            <div className="flex items-center gap-2 px-1">
              <p className="flex h-6 w-6 items-center justify-center rounded-full border bg-white font-cedarville text-base font-medium text-blue-500">
                {title}
              </p>
              <p className="text-[0.65rem] font-bold">{subtitle}</p>
            </div>
            {icon}
          </div>
        </Link>
      )}
    </>
  );
}

export default NavJump;
