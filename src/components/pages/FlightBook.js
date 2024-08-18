import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFlightInDetailed } from '../features/flights/flightsapicall/useFlightInDetailed';
import { format } from 'date-fns';
import Spinner from '../utils/Spinner';
import { useLoginContext } from '../context/login/LoginContext';
import { useEffect, useState } from 'react';
import Login from './Login';
import toast from 'react-hot-toast';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useFlightsMainContext } from '../context/Flights/FlightsMainContext';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useFlightBook } from './useFlightBook';
import Modal from '../utils/Modal';

function FlightBook() {
  const [openModal, setOpenModal] = useState(false);
  const [priceBreak, setPriceBreak] = useState(false);
  const [taxBreak, setTaxBreak] = useState(false);
  const [searchParams] = useSearchParams();

  const flightID = searchParams.get('flight_id');
  const date = new Date(searchParams.get('date'));
  const fromCity = searchParams.get('fromCity');
  const toCity = searchParams.get('toCity');
  const duration = searchParams.get('duration');
  const airlineListName = searchParams.get('airlineListName');
  const imgSrc = searchParams.get('imgSrc');
  const imgName = searchParams.get('imgName');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { flightInDetailed, isLoading } = useFlightInDetailed(flightID);

  console.log(flightInDetailed?.data);

  const {
    ticketPrice,
    stops,
    flightID: id,
    arrivalTime,
    departureTime,
  } = flightInDetailed?.data || {};

  const { isAuthenticated } = useLoginContext();
  const { number } = useFlightsMainContext();

  const navigate = useNavigate();

  const { flightBooks } = useFlightBook();

  useEffect(() => {
    if (isAuthenticated) setOpenModal(false);
    else {
      toast.error('Please login to book a flight');
      setOpenModal(true);
    }
  }, [isAuthenticated]);

  function handlePrice() {
    setPriceBreak(!priceBreak);
  }

  function handleTax() {
    setTaxBreak(!taxBreak);
  }

  function onSubmit(data) {
    const durationParts = duration.split(' ');

    const totalHours = Number(durationParts[0]);

    let endDate;
    if (totalHours < 24) endDate = new Date(date);
    else endDate = new Date(date);

    const searchParams = new URLSearchParams();
    searchParams.append('flightID', flightID);
    searchParams.append('date', date);
    searchParams.append('endDate', endDate);

    const flightObj = { flightId: flightID, startDate: date, endDate: endDate };

    flightBooks(flightObj);

    setTimeout(() => {
      navigate({
        pathname: '/payment',
        search: `?${searchParams.toString()}`,
      });
    }, 5000);
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className="mt-16 pb-2"></div>
          {isLoading && <Spinner />}
          {!isLoading && (
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
                    <div className="bg-white w-screen p-5 gap-10 border rounded-sm">
                      <div className="py-3 rounded-sm shadow-[0_1px_4px_0_rgba(0,0,0,.21)] border border-[#e9e9e9]">
                        <div className="flex justify-between items-center border-l-4 border-[#249995] px-3">
                          <div>
                            <p className="font-semibold text-lg text-black">
                              <b>
                                {fromCity} → {toCity}
                              </b>
                            </p>
                            <p className="gap-x-2 flex mt-3 items-center">
                              <span className="bg-[#ffedd1] py-1 px-2 text-sm font-semibold">
                                {format(date, 'EEEEEEE')}, {format(date, 'MMM')}{' '}
                                {format(date, 'dd')}
                              </span>
                              <span className="text-sm">
                                {' '}
                                {stops === 0
                                  ? 'Non Stop'
                                  : stops === 1
                                  ? '1 Stop'
                                  : `${stops} Stops`}{' '}
                                · {duration}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center p-4">
                          <img
                            src={imgSrc}
                            alt={imgName}
                            className="h-6 w-6 rounded-sm"
                          />
                          <p>{airlineListName}</p>
                          <p className="rounded-full border border-gray-400 px-1 text-gray-400 text-sm font-medium">
                            {id}
                          </p>
                        </div>
                        <div className="flex justify-between bg-[#f4f4f4] p-4 flex-col relative m-4">
                          <div className="flex gap-x-10">
                            <div className="flex w-full gap-x-4 items-center">
                              <div className="text-sm font-bold">
                                {departureTime}
                              </div>
                              <div className="border-2 my-[2px] border-[#979797] w-[10px] h-[10px] rounded-[50%] bg-[#f4f4f4]"></div>
                              <div className="text-sm font-bold">
                                {fromCity}
                              </div>
                            </div>
                            <div></div>
                          </div>
                          <div className="py-2 px-5 ml-[3.525rem] border-dashed border-l-2 border-[#979797]">
                            {duration}
                          </div>
                          <div className="flex gap-x-10">
                            <div className="flex w-full gap-x-4 items-center">
                              <div className="text-sm font-bold">
                                {arrivalTime}
                              </div>
                              <div className="border-2 my-[2px] border-[#979797] w-[10px] h-[10px] rounded-[50%] bg-[#f4f4f4]"></div>
                              <div className="text-sm font-bold">{toCity}</div>
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
                            className={`flex flex-row justify-between items-center ${
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
                                  Traveller(s) ({number} X ₹ {ticketPrice})
                                </div>
                                <div className="text-sm text-[#4a4a4a]">
                                  ₹ {ticketPrice * number}
                                </div>
                              </div>
                            )}
                            {!priceBreak && (
                              <div className="text-sm text-[#4a4a4a]">
                                ₹ {ticketPrice * number}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="border-b border-[#dfdfdf] py-3">
                          <div
                            className={`flex flex-row justify-between items-center ${
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
                                  Airline Taxes and Surcharges
                                </div>
                                <div className="text-sm text-[#4a4a4a]">
                                  ₹{' '}
                                  {Math.ceil((ticketPrice * number * 16) / 100)}
                                </div>
                              </div>
                            )}
                            {!taxBreak && (
                              <div className="text-sm text-[#4a4a4a]">
                                ₹ {Math.ceil((ticketPrice * number * 16) / 100)}
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
                            {ticketPrice * number +
                              Math.ceil((ticketPrice * number * 16) / 100)}
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
                        as mentioned on your passport or Government approved
                        IDs.
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
          )}
        </div>
      ) : (
        <Modal open={openModal} close={() => setOpenModal(false)}>
          <Login close={() => setOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default FlightBook;
