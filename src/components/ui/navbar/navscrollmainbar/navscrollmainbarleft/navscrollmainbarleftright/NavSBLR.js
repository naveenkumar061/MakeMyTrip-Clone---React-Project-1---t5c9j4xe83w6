import { dropdownEntries } from "../../../../../data/Info/navbar/DropdownEntries";
import NavScl from "./NavScl";

function NavSBLR() {
  // Assigning the dropdown entries to a variable for easier reference
  const scrollLeftRightOptions = dropdownEntries;

  return (
    <div className="flex gap-4 max-550:gap-0 max-450:flex-col max-450:gap-2">
      {/* Mapping through the dropdown entries to render a list item for each entry */}
      {scrollLeftRightOptions.map((scrollLeftRightOptionsItem, index) => (
        <NavScl
          key={index}
          scrollLeftRightOptionsItem={scrollLeftRightOptionsItem}
        />
      ))}
    </div>
  );
}

export default NavSBLR;
