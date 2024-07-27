import { dropdownEntries } from '../../assets/data/DropdownEntries';
import NavScl from './NavScl';

function NavSBLR() {
  return (
    <div className="flex gap-4 max-550:gap-0 max-450:flex-col max-450:gap-2">
      {dropdownEntries.map((scrollLeftRightOptionsItem, index) => (
        <NavScl
          key={index}
          scrollLeftRightOptionsItem={scrollLeftRightOptionsItem}
        />
      ))}
    </div>
  );
}

export default NavSBLR;
