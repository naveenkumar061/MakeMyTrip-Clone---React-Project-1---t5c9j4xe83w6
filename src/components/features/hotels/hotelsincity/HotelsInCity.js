import Spinner from '../../../utils/Spinner';
import HotelsInnCityList from './HotelsInnCityList';

function HotelsInCity({ hotelsList }) {
  console.log(hotelsList);
  if (!hotelsList) return <Spinner />;

  if (hotelsList.length === 0)
    return (
      <p className="w-[65vw] rounded-md h-fit bg-yellow-200 p-4 text-center text-lg font-bold text-red-600 shadow-md">
        Please select a different filter, city and try again, as there are no
        available hotels.
      </p>
    );

  return (
    <div className="w-[90%] shadow-lg h-fit md:w-full flex ml-4 flex-col bg-white gap-4">
      {hotelsList?.map((item, index) => (
        <HotelsInnCityList key={index} item={item} />
      ))}
    </div>
  );
}

export default HotelsInCity;
