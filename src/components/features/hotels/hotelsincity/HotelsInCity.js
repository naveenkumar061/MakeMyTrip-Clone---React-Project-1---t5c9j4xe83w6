function HotelsInCity({ hotelsList }) {
  // console.log(hotelsList);
  return (
    <div className="border-gray w-[90%] shadow-lg h-fit md:w-[65vw] border bg-white px-8 py-4">
      {hotelsList?.map((item, index) => {
        return <div key={index}>{item.name}</div>;
      })}
    </div>
  );
}

export default HotelsInCity;
