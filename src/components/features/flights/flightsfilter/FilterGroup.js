// External libraries
import React from 'react';
import { airlineData } from '../../../assets/data/AirlineData';

function FilterGroup({ filters, filterItems, onAddFilter }) {
  const airline = airlineData;

  // Handles the change event when a checkbox is selected or deselected
  function handleSelected(e) {
    const { value, checked } = e.target;
    onAddFilter(value, checked);
  }

  // Handles the click event on the div containing the filter name and icon
  function handleDivClick(filterName) {
    const isFilterPresent = filterItems.includes(filterName);
    onAddFilter(filterName, !isFilterPresent);
  }

  return (
    <div className="flex flex-col">
      {filters.map((filter) => (
        <div key={filter.name} className="flex justify-between pb-2">
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              value={filter.name}
              onChange={handleSelected}
              checked={filterItems.includes(filter.name)}
            />
            <div
              className="flex cursor-pointer items-center justify-center gap-2"
              onClick={() => handleDivClick(filter.name)}
            >
              {filter.icon >= 0 && (
                <img
                  src={require(`../../../assets/images/${airline[
                    filter.icon
                  ].name
                    .toLowerCase()
                    .replaceAll(' ', '')}img.png`)}
                  alt={filter.icon}
                  className="h-4 w-4"
                />
              )}
              <div>
                {filter.name.includes('Airline')
                  ? filter.name.slice(0, filter.name.length - 8)
                  : filter.name}
              </div>
            </div>
          </div>
          <div>₹ {filter.price}</div>
        </div>
      ))}
    </div>
  );
}

export default FilterGroup;
