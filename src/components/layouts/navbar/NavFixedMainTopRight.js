import React from 'react';
import { IN } from 'country-flag-icons/react/3x2';
import PageSwitcher from './PageSwitcher';
import { toprightmenudatalist } from '../../assets/data/TopRightMenuDataList';

function NavFixedMainTopRight() {
  return (
    <div className="flex items-center justify-center text-xs text-white">
      {toprightmenudatalist.map((topRightNavItem, index) => (
        <PageSwitcher key={index} topRightNavItem={topRightNavItem} />
      ))}
      <div className="flex h-10 items-center rounded-[.25rem] bg-stone-600 p-2">
        <IN title="India" className="h-7 w-7 pr-2" />
        <div className="flex text-white">
          <p className="border-r-2 pr-1 text-xs">IN</p>
          <p className="border-r-2 px-1 text-xs">ENG</p>
          <p className="pl-1 text-xs">INR</p>
        </div>
      </div>
    </div>
  );
}

export default NavFixedMainTopRight;
