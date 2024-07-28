function HotelsInCity({ hotelsList }) {
  // console.log(hotelsList);
  return (
    <div className="border-gray absolute right-[4%] h-fit w-[65vw] border bg-white px-8 py-4">
      {hotelsList?.map((item, index) => {
        return <div key={index}>{item.name}</div>;
      })}
    </div>
  );
}

export default HotelsInCity;
