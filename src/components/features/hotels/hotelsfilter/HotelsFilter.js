import { IoMdClose } from 'react-icons/io';
import NightPriceList from './NightPriceList';
import UserRatingList from './UserRatingList';
import { useHotelsMainContext } from '../../../context/Resort/HotelsMainContext';
import { pricePerNight } from '../../../assets/data/data-pricePerNight';
import { userRating } from '../../../assets/data/data-userRating';

function HotelsFilter({ hotelsList }) {
  const { filter, onAddFilter } = useHotelsMainContext();

  function handleRemoveItem(item) {
    onAddFilter(item, false);
  }
  function handleRemoveAllFilters() {
    filter.map((item) => onAddFilter(item, false));
  }
  return (
    <div className="border-gray h-fit w-full md:w-[28vw] border bg-white px-8 py-4">
      {filter.length > 0 && (
        <>
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Applied Filters</h3>
            <p
              className="cursor-pointer text-blue-500 hover:text-red-500"
              onClick={handleRemoveAllFilters}
            >
              Clear All
            </p>
          </div>
          <div className="inline p-2">
            {filter.map((item, index) => (
              <div
                className="mb-4 flex items-center justify-between rounded-md bg-blue-200 p-2 text-sm"
                key={index}
              >
                <p>{item}</p>
                <IoMdClose
                  className="cursor-pointer text-lg text-blue-500 hover:text-red-500"
                  onClick={() => handleRemoveItem(item)}
                />
              </div>
            ))}
          </div>
        </>
      )}
      <h1 className="pb-4 text-xl font-semibold">Select Filters</h1>
      <div className="pb-4">
        <h1 className="pb-2 text-lg font-semibold">Price per Night</h1>
        <div>
          {pricePerNight.map((item, index) => (
            <NightPriceList key={index} item={item} hotelsList={hotelsList} />
          ))}
        </div>
      </div>
      <div>
        <h1 className="pb-2 text-lg font-semibold">User Rating</h1>
        <div>
          {userRating.map((item, index) => (
            <UserRatingList key={index} item={item} hotelsList={hotelsList} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelsFilter;
