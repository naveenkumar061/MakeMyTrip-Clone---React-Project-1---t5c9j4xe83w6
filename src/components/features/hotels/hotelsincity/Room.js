function Room({ item, images, index }) {
  return (
    <div className="rounded-md shadow-[5px_5px_18px_#d3d3d3] md:h-80 w-full flex items-center flex-col md:flex-row">
      <div className="h-full md:w-1/3">
        <img
          src={images[index % images.length]}
          alt="images"
          className="h-full w-full rounded-tl-md rounded-bl-md"
        />
      </div>
      <div className="flex h-full md:w-1/3 pb-5 px-5 pt-8 flex-col gap-3">
        <p className="text-green-600 font-bold text-lg">
          {item.cancellationPolicy}
        </p>
        <p className="text-gray-600 text-sm flex items-center">
          <img
            src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/Food&amp;Beverage_WelcomeDrinkonArrival.png"
            alt="Free Welcome Drink on Arrival"
            className="w-[20px] h-[20px]"
          />
          &nbsp; Free Welcome Dring on Arrival
        </p>
        <p className="text-gray-600 text-sm flex items-center">
          <img
            src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/Default_DefaultDot.png"
            alt="Book with ₹0 Payment"
            className="w-[20px] h-[20px]"
          />
          &nbsp; Book with ₹0 Payment
        </p>
        <p className="text-gray-600 text-sm flex items-center">
          <img
            src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/Inclusion_RedCross.png"
            alt="No meals included"
            className="w-[20px] h-[20px]"
          />
          &nbsp; No meals included
        </p>
        <p className="text-gray-600 text-sm flex items-center">
          <img
            src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/Earlycheckin&amp;Latecheckout_EarlyCheckin.png"
            alt="Free Early Check in"
            className="w-[20px] h-[20px]"
          />
          &nbsp; Free Early Check in
        </p>
        <p className="text-gray-600 text-sm flex items-center">
          <img
            src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/OtherServices_LinenChange.png"
            alt="Free Linen Change"
            className="w-[20px] h-[20px]"
          />
          &nbsp; Free Linen Change
        </p>
      </div>
      <div className="h-full md:w-1/3 flex flex-col gap-3 w-full pt-8 pb-5 px-5 relative">
        <div className="flex md:justify-between justify-around">
          <p className="font-bold text-2xl">{item.bedDetail}</p>
          <p className="font-bold text-2xl">
            ₹{item.price}
            <br />
            <span className="text-gray-600 text-base">
              +₹{item.costDetails.taxesAndFees} taxes & fees
            </span>
          </p>
        </div>
        <p className="font-bold text-lg">
          Room Type:
          <br />{' '}
          <span className="text-gray-600 text-base">{item.roomType}</span>
        </p>
        <p className="font-bold text-lg">
          Room Size:
          <br />{' '}
          <span className="text-gray-600 text-base">{item.roomSize}</span>
        </p>
        <button
          className="text-nowrap bg-gradient-to-r from-[#53b2fe] to-[#065af3] rounded-[50px] text-white text-base  w-[150px] cursor-pointer h-[38px] lg:absolute lg:bottom-5 lg:right-5"
          onClick={() => {
            // navigatetoform(item.roomNumber);
          }}
        >
          SELECT ROOM
        </button>
      </div>
    </div>
  );
}

export default Room;
