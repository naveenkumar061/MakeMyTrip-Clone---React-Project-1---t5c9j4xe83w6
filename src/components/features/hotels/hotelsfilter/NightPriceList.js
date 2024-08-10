import { useHotelsMainContext } from '../../../context/Resort/HotelsMainContext';

function NightPriceList({ item, hotelsList }) {
  const min = item.split(' ')[0]?.slice(1);
  const max = item.split(' ')[2]?.slice(1);

  const { filter, onAddFilter } = useHotelsMainContext();

  function handleSelected(e) {
    const { value, checked } = e.target;
    onAddFilter(value, checked);
  }

  function getHotelCount() {
    return hotelsList?.filter((hotel) => {
      const price = hotel.avgCostPerNight;
      if (max) {
        return price >= min && price <= max;
      }
      return price >= min.slice(0, min.length - 2);
    }).length;
  }

  const hotelCount = getHotelCount();

  function handleDivClick(filterName) {
    const isFilterPresent = filter.includes(filterName);
    onAddFilter(filterName, !isFilterPresent);
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <input
          type="checkbox"
          value={item}
          onChange={handleSelected}
          checked={filter.includes(item)}
        />
        <div onClick={() => handleDivClick(item)}>{item}</div>
      </div>
      <div>({hotelCount})</div>
    </div>
  );
}

export default NightPriceList;
