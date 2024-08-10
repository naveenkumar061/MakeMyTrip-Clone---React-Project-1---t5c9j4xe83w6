import { useHotelsMainContext } from '../../../context/Resort/HotelsMainContext';

function UserRatingList({ item, hotelsList }) {
  const { filter, onAddFilter } = useHotelsMainContext();

  function handleSelected(e) {
    const { value, checked } = e.target;
    onAddFilter(value, checked);
  }

  function getHotelCount() {
    return hotelsList?.filter((hotel) => {
      const rating = hotel.rating;
      if (item === 'Excellent:4.2+') return rating >= 4.2;

      if (item === 'Very Good:3.5+') return rating >= 3.5 && rating < 4.2;

      if (item === 'Good:3+') return rating >= 3 && rating < 3.5;
      return 0;
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

export default UserRatingList;
