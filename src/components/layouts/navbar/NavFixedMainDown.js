import React from 'react';
import { dropdownEntries } from '../../assets/data/DropdownEntries';
import NavFixedMainDownList from './NavFixedMainDownList';

function NavFixedMainDown() {
  return (
    <div className="relative z-10 mx-72 mt-16 flex items-center justify-between gap-8 rounded-md border border-gray-200 bg-white px-8 pt-4 text-gray-700 shadow-md w-fit">
      {dropdownEntries.map((dropdownListItem, index) => (
        <NavFixedMainDownList key={index} dropdownListItem={dropdownListItem} />
      ))}
    </div>
  );
}

export default NavFixedMainDown;
