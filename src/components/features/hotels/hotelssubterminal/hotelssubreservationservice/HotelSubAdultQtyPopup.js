import { useHotelsMainContext } from '../../../../context/Resort/HotelsMainContext';

function HotelSubAdultQtyPopup() {
  const { noOfAdults, handleNumberOfAdults } = useHotelsMainContext();

  const adult = Array.from({ length: 40 }, (_, i) => i + 1);
  const adultCorrected = adult.map((item) =>
    item < 10 ? `0${item}` : `${item}`
  );

  return (
    <div className="absolute bottom-5 right-5 z-10 h-[16vh] overflow-y-auto rounded-md border border-gray-400 bg-white">
      {adultCorrected.map((item, index) => (
        <div
          key={index}
          className={`${
            noOfAdults === adult[index] && 'bg-gray-200'
          } px-4 py-1 text-center hover:bg-gray-200`}
          onClick={(event) => handleNumberOfAdults(event, adult[index])}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default HotelSubAdultQtyPopup;
