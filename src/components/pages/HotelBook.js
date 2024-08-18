import { useForm } from 'react-hook-form';
import { useLoginContext } from '../context/login/LoginContext';
import { useEffect, useState } from 'react';
import Login from './Login';
import Modal from '../utils/Modal';
import toast from 'react-hot-toast';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { useHotelsMainContext } from '../context/Resort/HotelsMainContext';
import { useHotelById } from '../features/hotels/hotelsapicalls/useHotelById';
import { Link, useSearchParams } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import { useHotelBook } from './useHotelBook';
import Bus from '../assets/images/bus.png';

function HotelBook() {
  const [openModal, setOpenModal] = useState(false);
  const [priceBreak, setPriceBreak] = useState(false);
  const [taxBreak, setTaxBreak] = useState(false);
  const { isAuthenticated } = useLoginContext();
  const {
    noOfRooms,
    longYearCheckIn,
    noOfAdults,
    monthCheckIn,
    weekdayCheckIn,
    dayCheckIn,
    longYearCheckOut,
    monthCheckOut,
    weekdayCheckOut,
    dayCheckOut,
    dateCheckOut,
    dateCheckIn,
  } = useHotelsMainContext();

  const [searchParams] = useSearchParams();

  const hotelId = searchParams.get('hotel_id');
  const ticketPrice = searchParams.get('price');
  const imgSrc = searchParams.get('imgSrc');
  const roomType = searchParams.get('roomType');

  const { hotelDetails } = useHotelById(hotelId);

  console.log(hotelDetails?.data);

  const { name, rating, location, houseRules } = hotelDetails?.data || {};

  const noOfNights = differenceInDays(dateCheckOut, dateCheckIn);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { hotelBooks } = useHotelBook();

  function onSubmit(data) {
    const hotelObj = {
      hotelId: hotelId,
      startDate: new Date(dateCheckIn),
      endDate: new Date(dateCheckOut),
    };

    hotelBooks(hotelObj);
  }

  function handlePrice() {
    setPriceBreak(!priceBreak);
  }

  function handleTax() {
    setTaxBreak(!taxBreak);
  }

  useEffect(() => {
    if (isAuthenticated) setOpenModal(false);
    else {
      toast.error('Please login to book a flight');
      setOpenModal(true);
    }
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className="mt-16 pb-2"></div>
          <div className="w-full h-screen relative">
            <div className="bg-[#041422]">
              <p className="text-white font-bold min-1200:text-left z-10 text-xl text-center w-full sticky top-0 py-[20px] my-0 mx-auto min-1200:w-[1200px]">
                Complete Booking
              </p>
            </div>
            <div className="bg-gradient-to-t from-[#15457b] to-[#051423] min-h-48 absolute top-0 left-0 w-full"></div>
            <div className="pb-[100px] my-0 mx-auto bg-[#f4f4f4] min-h-screen">
              <div className="flex flex-col gap-4 relative min-1200:justify-center min-1200:items-center">
                <div className="flex flex-col min-1200:items-center gap-4 lg:flex-row min-1200:w-[1200px] lg:m-4">
                  <div className="shrink-0 w-[860px]">
                    <div className="bg-white rounded shadow-[0_1px_8px_#0000002e] flex flex-col mb-5">
                      <div className="border-top-[1px] border-[#d8d8d8]">
                        <div className="flex px-5 py-[15px]">
                          <div className="flex-[1]">
                            <p className="text-[22px] text-black font-bold">
                              {name}
                            </p>
                            <div className="flex mt-2">
                              <div className="bg-[#1a7971] mt-[4.5px] w-[40px] h-[22px] rounded-[4px] text-white mr-[10px] flex flex-row items-center justify-center">
                                <span
                                  className="bg-no-repeat bg-[length:350px_500px] bg-[position:-132px_-56px] w-[9px] h-[9px] mr-1"
                                  style={{
                                    backgroundImage: `url(${Bus})`,
                                  }}
                                ></span>
                                <p>{rating}</p>
                              </div>
                            </div>
                            <p className="text-[14px] text-[#9b9b9b] my-2">
                              {location}
                            </p>
                          </div>
                          <div className="shrink-0 ml-[30px] w-[90px]">
                            <div className="relative h-[90px] w-[90px]">
                              <img
                                alt="hotel"
                                src={imgSrc}
                                className="rounded h-full object-cover w-full"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid gap-[5px] border-b-[1px] border-b-dotted border-b-gray-300 border-t-[1px] border-t-dotted border-t-gray-300 grid-cols-2 mb-2">
                          <div className="bg-[#f2f2f266] py-4 px-[20px] flex items-center justify-between">
                            <div>
                              <p className="mb-[3px] text-[#757575]">
                                CHECK IN
                              </p>
                              <p className="text-sm">
                                {weekdayCheckIn.slice(0, 3)}
                                <span className="font-bold text-[1.4rem]">
                                  {dayCheckIn} {monthCheckIn}
                                </span>{' '}
                                {longYearCheckIn}
                              </p>
                            </div>
                            <div className="text-left">
                              <p className="mb-[3px] text-[#757575]">
                                CHECK OUT
                              </p>
                              <p className="text-sm">
                                {weekdayCheckOut.slice(0, 3)}
                                <span className="font-bold text-[1.4rem]">
                                  {dayCheckOut} {monthCheckOut}
                                </span>{' '}
                                {longYearCheckOut}
                              </p>
                            </div>
                          </div>
                          <div className="bg-[#f2f2f266] py-4 px-[20px] flex items-center">
                            <p className="text-black text-base">
                              <span className="font-bold mr-1">
                                {noOfNights}
                              </span>{' '}
                              Night |{' '}
                              <span className="font-bold mx-1">
                                {noOfAdults}
                              </span>{' '}
                              Adults | <span>{noOfRooms} Room</span>
                            </p>
                          </div>
                        </div>
                        <div className="py-4 px-5">
                          <div className="flex justify-between">
                            <div className="flex-[1]">
                              <p className="text-lg text-black font-bold">
                                {roomType}
                              </p>
                              <p className="mt-[5px] text-[14px] text-[#9b9b9b]">
                                {noOfAdults} Adults
                              </p>
                              <ul className="mt-[15px] mb-[10px] grid grid-cols-1">
                                <li className="flex">
                                  <span className="flex items-start justify-center shrink-0 mr-2 mt-3">
                                    <span className="bg-[#4a4a4a] shrink-0 h-[5px] w-[5px] inline-flex rounded-[50%]"></span>
                                  </span>
                                  <div className="flex flex-col items-baseline gap-[7px]">
                                    <span>Room Only</span>
                                  </div>
                                </li>
                                <li className="flex">
                                  <span className="flex items-start justify-center shrink-0 mr-2 mt-3">
                                    <span className="bg-[#4a4a4a] shrink-0 h-[5px] w-[5px] inline-flex rounded-[50%]"></span>
                                  </span>
                                  <div className="flex flex-col items-baseline gap-[7px]">
                                    <span>No meals included</span>
                                  </div>
                                </li>
                                <li className="flex">
                                  <span className="flex items-start justify-center shrink-0 mr-2 mt-3">
                                    <span className="bg-[#4a4a4a] shrink-0 h-[5px] w-[5px] inline-flex rounded-[50%]"></span>
                                  </span>
                                  <div className="flex flex-col items-baseline gap-[7px]">
                                    <span>
                                      20% discount on Food and Soft Beverages
                                    </span>
                                  </div>
                                </li>
                              </ul>
                              <div className="my-[10px]">
                                <div className="flex items-start gap-[7px]">
                                  <span className="font-bold text-[#249995]">
                                    On Cancellation, You will not get any refund
                                  </span>
                                  <Link
                                    className="font-bold text-[#0084ff] ml-[10px] cursor-pointer"
                                    to="/yettocome"
                                  >
                                    Cancellation policy details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#fff8ed] border-b border-t border-dashed border-[#ffc4c2] py-3 px-5">
                          <div className="flex items-center">
                            <p className="text-[#cf8100] text-lg font-black">
                              Important information
                            </p>
                          </div>
                          <div>
                            <p className="text-black text-[22px] mt-7 font-bold">
                              Property Rules
                            </p>
                            <div className="border border-[#bababa80] m-[10px]"></div>
                            <ul className="text-[#4a4a4a]">
                              <li className="flex">
                                <span className="bg-[#4a4a4a] rounded-[50%] inline-block shrink-0 h-[6px] w-[6px] mt-[10px] mx-[10px]"></span>
                                Guests below 18 years of age are not allowed at
                                the property.
                              </li>
                              <li className="flex">
                                <span className="bg-[#4a4a4a] rounded-[50%] inline-block shrink-0 h-[6px] w-[6px] mt-[10px] mx-[10px]"></span>
                                Pets are{' '}
                                {houseRules?.restrictions.petAllowed
                                  ? ''
                                  : 'not '}
                                allowed.
                              </li>
                              <li className="flex">
                                <span className="bg-[#4a4a4a] rounded-[50%] inline-block shrink-0 h-[6px] w-[6px] mt-[10px] mx-[10px]"></span>
                                Smoking is{' '}
                                {houseRules?.restrictions.smokingAllowed
                                  ? ''
                                  : 'not '}
                                allowed.
                              </li>
                              <li className="flex">
                                <span className="bg-[#4a4a4a] rounded-[50%] inline-block shrink-0 h-[6px] w-[6px] mt-[10px] mx-[10px]"></span>
                                Unmarried couples are{' '}
                                {houseRules?.guestProfile
                                  .unmarriedCouplesAllowed
                                  ? ''
                                  : 'not '}{' '}
                                allowed.
                              </li>
                              <li className="flex">
                                <span className="bg-[#4a4a4a] rounded-[50%] inline-block shrink-0 h-[6px] w-[6px] mt-[10px] mx-[10px]"></span>
                                <span>ID proofs accepted</span>
                                <span>:</span>
                                <ol>
                                  {houseRules?.idProofRelated.idProofsAccepted.map(
                                    (item, index) => (
                                      <span key={index}>
                                        {item}
                                        {index ===
                                        houseRules.idProofRelated
                                          .idProofsAccepted.length -
                                          1
                                          ? ''
                                          : ','}{' '}
                                      </span>
                                    )
                                  )}
                                </ol>
                              </li>
                              <li className="flex">
                                <span className="bg-[#4a4a4a] rounded-[50%] inline-block shrink-0 h-[6px] w-[6px] mt-[10px] mx-[10px]"></span>
                                Local IDs are{' '}
                                {houseRules?.idProofRelated.localIdsAllowed
                                  ? ''
                                  : 'not '}
                                allowed.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white min-1200:w-1/2 w-screen self-start rounded-sm p-4 sticky top-20 border h-fit">
                    <p className="font-bold text-lg">Fare Summary</p>
                    <div className="border-b border-black">
                      <div className="border-b border-[#dfdfdf] py-3">
                        <div
                          className={`flex flex-row justify-between items-cente ${
                            priceBreak ? 'flex-col gap-1' : 'flex-row'
                          }`}
                        >
                          <div className="flex justify-center items-center">
                            <div
                              className={`mt-1 mr-2 flex items-center gap-2 cursor-pointer ${
                                priceBreak ? 'w-full self-start' : ''
                              }`}
                              onClick={handlePrice}
                            >
                              {!priceBreak && <IoIosAddCircleOutline />}
                              {priceBreak && <AiOutlineMinusCircle />}
                              <div className="text-base font-semibold">
                                Base Fare
                              </div>
                            </div>
                          </div>
                          {priceBreak && (
                            <div className="flex items-center justify-between">
                              <div className="ml-6 text-sm text-[#4a4a4a]">
                                {noOfRooms} {noOfRooms === 1 ? 'Room' : 'Rooms'}{' '}
                                * {noOfNights} Night
                              </div>
                              <div className="text-sm text-[#4a4a4a]">
                                ₹{' '}
                                {Math.round(ticketPrice) *
                                  noOfRooms *
                                  noOfNights}
                              </div>
                            </div>
                          )}
                          {!priceBreak && (
                            <div className="text-sm text-[#4a4a4a]">
                              ₹{' '}
                              {Math.round(ticketPrice) * noOfRooms * noOfNights}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="border-b border-[#dfdfdf] py-3">
                        <div
                          className={`flex flex-row justify-between items-cente ${
                            taxBreak ? 'flex-col gap-1' : 'flex-row'
                          }`}
                        >
                          <div className="flex justify-center items-center">
                            <div
                              className={`mt-1 mr-2 flex items-center gap-2 cursor-pointer ${
                                taxBreak ? 'w-full self-start' : ''
                              }`}
                              onClick={handleTax}
                            >
                              {!taxBreak && <IoIosAddCircleOutline />}
                              {taxBreak && <AiOutlineMinusCircle />}
                              <div className="text-base font-semibold">
                                Taxes and Surcharges
                              </div>
                            </div>
                          </div>
                          {taxBreak && (
                            <div className="flex items-center justify-between">
                              <div className="ml-6 text-sm text-[#4a4a4a]">
                                Hotel Taxes and Surcharges
                              </div>
                              <div className="text-sm text-[#4a4a4a]">
                                ₹{' '}
                                {Math.ceil(
                                  (Math.round(ticketPrice) *
                                    noOfRooms *
                                    noOfNights *
                                    16) /
                                    100
                                )}
                              </div>
                            </div>
                          )}
                          {!taxBreak && (
                            <div className="text-sm text-[#4a4a4a]">
                              ₹{' '}
                              {Math.ceil(
                                (Math.round(ticketPrice) *
                                  noOfRooms *
                                  noOfNights *
                                  16) /
                                  100
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-0 pt-4">
                      <p className="flex justify-between items-center">
                        <span className="font-semibold text-base">
                          Total Amount
                        </span>
                        <span className="font-semibold text-base">
                          ₹{' '}
                          {Math.round(ticketPrice) * noOfRooms * noOfNights +
                            Math.ceil(
                              (Math.round(ticketPrice) *
                                noOfRooms *
                                noOfNights *
                                16) /
                                100
                            )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 lg:flex-row min-1200:w-[1200px]">
                  <form
                    className="w-screen rounded-sm flex flex-col gap-4 h-fit py-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <p className="text-lg font-bold">Traveller Details</p>
                    <div className="bg-[#ffedd1] flex items-center p-[10px] rounded-[2px] shadow-[0_1px_2px_#00000026] m-0 w-full text-[12px]">
                      <span className="font-bold">Important</span>: Enter name
                      as mentioned on your passport or Government approved IDs.
                    </div>
                    <div className="rounded-sm shadow-sm bg-white my-5 w-full flex flex-col items-start p-[13px]">
                      <div className="flex flex-row items-center gap-[22px] w-full m-[15px]">
                        <div className="flex flex-col items-start h-[95px]">
                          <p className="m-0 mb-1.5 p-0 text-left font-normal text-sm">
                            First Name*
                          </p>
                          <input
                            placeholder="First Name"
                            className="rounded-[4px] border border-[hsla(0,0%,60.8%,.5)] p-[10px] text-[#4a4a4a] outline-none w-[230px]"
                            name="firstName"
                            {...register('firstName', {
                              required: 'First Name is required',
                              pattern: {
                                value: /^[a-zA-Z\s]*$/,
                                message: 'Invalid Name; provide only letters',
                              },
                            })}
                          />
                          {errors.firstName && (
                            <div className="mt-1 text-[12px] text-red-500">
                              {errors.firstName.message}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-start h-[95px]">
                          <p className="m-0 mb-1.5 p-0 text-left font-normal text-sm">
                            Last Name*
                          </p>
                          <input
                            placeholder="Last Name"
                            className="rounded-[4px] border border-[hsla(0,0%,60.8%,.5)] p-[10px] text-[#4a4a4a] outline-none w-[230px]"
                            name="lastName"
                            {...register('lastName', {
                              required: 'Last Name is required',
                              pattern: {
                                value: /^[a-zA-Z\s]*$/,
                                message: 'Invalid Name; provide only letters',
                              },
                            })}
                          />
                          {errors.lastName && (
                            <div className="mt-1 text-[12px] text-red-500">
                              {errors.lastName.message}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-start h-[95px]">
                          <p className="m-0 pl-2 text-left font-normal text-sm">
                            Gender*
                          </p>
                          <div className="flex flex-row items-start justify-start gap-2 rounded-[4px]">
                            <label
                              htmlFor="maleOption"
                              className="text-center p-2 text-sm block cursor-pointer"
                            >
                              <input
                                type="radio"
                                id="maleOption"
                                name="gender"
                                value="male"
                                {...register('gender', {
                                  required: 'Please provide gender',
                                })}
                                className="mr-2"
                              />
                              MALE
                            </label>

                            <label
                              htmlFor="femaleOption"
                              className="text-center p-2 text-sm block cursor-pointer"
                            >
                              <input
                                type="radio"
                                id="femaleOption"
                                name="gender"
                                value="female"
                                {...register('gender', {
                                  required: 'Please provide gender',
                                })}
                                className="mr-2"
                              />
                              FEMALE
                            </label>
                          </div>
                          {errors.gender && (
                            <div className="mt-1 text-[12px] text-red-500">
                              {errors.gender.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row m-4 gap-[22px]">
                        <div className="flex flex-col items-start h-[95px]">
                          <p className="m-0 mb-1.5 p-0 text-left font-normal text-sm">
                            Mobile No
                          </p>
                          <input
                            placeholder="+91"
                            className="rounded-[4px] border border-[hsla(0,0%,60.8%,.5)] p-[10px] text-[#4a4a4a] outline-none w-[230px]"
                            name="mobileNumber"
                            {...register('mobileNumber', {
                              required: 'Mobile number is required',
                              pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Mobile number must be 10 digits',
                              },
                            })}
                          />
                          {errors.mobileNumber && (
                            <div className="mt-1 text-[12px] text-red-500">
                              {errors.mobileNumber.message}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-start h-[95px]">
                          <p className="m-0 mb-1.5 p-0 text-left font-normal text-sm">
                            Email
                          </p>
                          <input
                            placeholder="Email"
                            className="rounded-[4px] border border-[hsla(0,0%,60.8%,.5)] p-[10px] text-[#4a4a4a] outline-none w-[230px]"
                            name="email"
                            {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address',
                              },
                            })}
                          />
                          {errors.email && (
                            <div className="mt-1 text-[12px] text-red-500">
                              {errors.email.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-sm shadow-sm bg-white my-5 w-full flex flex-col items-start p-[13px]">
                      <p className="text-lg font-bold my-2.5 mx-4">
                        Your pincode and state{' '}
                        <span className="text-xs text-gray-500 font-thin">
                          (Required for generating your invoice. You can edit
                          this anytime later in your profile section.)
                        </span>
                      </p>
                      <div className="flex flex-row items-center gap-[22px] w-full m-[15px]">
                        <div className="flex flex-col items-start h-[95px] w-[230px]">
                          <p className="m-0 mb-1.5 p-0 text-left font-normal text-sm">
                            Pincode
                          </p>
                          <input
                            name="pincode"
                            className="rounded-[4px] border border-[hsla(0,0%,60.8%,.5)] p-[10px] text-[#4a4a4a] outline-none w-[230px]"
                            {...register('pincode', {
                              required: 'Pincode is required',
                              pattern: {
                                value: /^[1-9][0-9]{5}$/,
                                message:
                                  'Pincode must be a 6-digit number starting with a non-zero digit',
                              },
                            })}
                          />
                          {errors.pincode && (
                            <div className="mt-1 text-[12px] text-red-500 w-full">
                              {errors.pincode.message}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-start h-[95px] w-[230px]">
                          <p className="m-0 mb-1.5 p-0 text-left font-normal text-sm">
                            State
                          </p>
                          <input
                            name="state"
                            className="rounded-[4px] border border-[hsla(0,0%,60.8%,.5)] p-[10px] text-[#4a4a4a] outline-none w-[230px]"
                            {...register('state', {
                              required: 'State is required',
                            })}
                          />
                          {errors.state && (
                            <div className="mt-1 text-[12px] text-red-500 w-full">
                              {errors.state.message}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-start h-[95px] w-[230px]">
                          <p className="m-0 mb-1.5 p-0 text-left font-normal text-sm">
                            Address
                          </p>
                          <input
                            name="address"
                            className="rounded-[4px] border border-[hsla(0,0%,60.8%,.5)] p-[10px] text-[#4a4a4a] outline-none w-[230px]"
                            {...register('address')}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className={`mb-[23px] items-center border-0 rounded shadow-[0_1px_7px_rgba(0,0,0,0.2)] cursor-pointer inline-flex flex-shrink-0 text-lg font-extrabold justify-center outline-none px-5 py-[9px] text-center uppercase w-[310px] ${
                        isValid
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#c3c2c2] text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isValid}
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Continue
                    </button>
                  </form>
                  <div className="min-1200:w-1/2 w-screen"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Modal open={openModal} close={() => setOpenModal(false)}>
          <Login close={() => setOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default HotelBook;
