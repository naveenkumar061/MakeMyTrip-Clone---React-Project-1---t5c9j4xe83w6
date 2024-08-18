import { useEffect, useState } from 'react';
import { useLoginContext } from '../context/login/LoginContext';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useBusBook } from './useBusBook';
import { useBusesMainContext } from '../context/Buses/BusesMainContext';
import { format } from 'date-fns';
import Modal from '../utils/Modal';
import Login from './Login';
import Bus from '../assets/images/bus.png';

function BusBook() {
  const [openModal, setOpenModal] = useState(false);

  const { isAuthenticated } = useLoginContext();

  const [searchParams] = useSearchParams();

  const fare = parseInt(searchParams.get('fare'), 10);
  const busId = searchParams.get('busId');
  const seats = searchParams.get('seats');
  const busName = searchParams.get('busName');
  const type = searchParams.get('type');
  const arrivalTime = searchParams.get('arrivalTime');
  const departureTime = searchParams.get('departureTime');
  const departureDate = searchParams.get('departureDate');
  const source = searchParams.get('from');
  const destination = searchParams.get('to');
  const duration = searchParams.get('travelDuration');

  const seatsArray = seats.split(',');
  const { date, year, weekday, month, day } = useBusesMainContext();

  useEffect(() => {
    if (isAuthenticated) setOpenModal(false);
    else {
      toast.error('Please login to book a flight');
      setOpenModal(true);
    }
  }, [isAuthenticated]);

  console.log(seatsArray);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { busBooks } = useBusBook();

  function onSubmit(data) {
    const busObj = {
      busId: busId,
      startDate: new Date(date),
      endDate: new Date(departureDate),
    };

    busBooks(busObj);
  }

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
                  <div className="bg-white w-screen p-5 gap-10 border rounded-sm">
                    <div className="py-3 rounded-sm shadow-[0_1px_4px_0_rgba(0,0,0,.21)] border border-[#e9e9e9]">
                      <div className="mb-4 flex flex-col gap-[7px]">
                        <div className="py-3 px-5">
                          <div className="flex justify-between mb-[6px] text-black">
                            <p className="text-lg font-bold">{busName}</p>
                            <span className="text-sm font-bold">
                              Seat No:
                              <span>
                                <span>{seats}</span>
                              </span>
                            </span>
                          </div>
                          <div className="flex justify-between mb-[10px] text-xs">
                            <span className="text-[#4a4a4a] text-[14px]">
                              {type} Seater
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-[2px] py-[6px] px-5">
                          <div className="bg-[#1a7971] mt-[4.5px] w-[40px] h-[22px] rounded-[4px] text-white mr-[10px] flex flex-row items-center justify-center">
                            <span
                              className="bg-no-repeat bg-[length:350px_500px] bg-[position:-132px_-56px] w-[9px] h-[9px] mr-1"
                              style={{
                                backgroundImage: `url(${Bus})`,
                              }}
                            ></span>
                            <p>4.9</p>
                          </div>
                        </div>
                        <div className="flex flex-row text-black justify-between py-3 px-5 gap-[7px]">
                          <div>
                            <span className="relative text-lg font-bold">
                              {arrivalTime}
                              <span className="font-normal text-base text-[#4a4a4a] ml-2">
                                {day} {month}' {year}, {weekday.slice(0, 3)}
                              </span>
                            </span>
                            <div className="flex flex-col max-w-[200px] max-h-[200px] mt-2">
                              <span className="text-base font-normal mb-2 text-black">
                                {source}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col mb-5">
                            <span className="text-[14px] text-[#4a4a4a] text-center pb-2">
                              {duration}
                            </span>
                            <div className="w-[108px] border border-[#e7e7e7] mx-[5px] mb-[40px]"></div>
                          </div>
                          <div>
                            <span className="relative text-lg font-bold">
                              {departureTime}
                              <span className="text-base font-normal text-[#4a4a4a] ml-2">
                                {format(new Date(departureDate), 'dd')}{' '}
                                {format(new Date(departureDate), 'MMM')}'{' '}
                                {format(new Date(departureDate), 'yy')},{' '}
                                {format(
                                  new Date(departureDate),
                                  'EEEEEEE'
                                ).slice(0, 3)}
                              </span>
                            </span>
                            <div className="flex flex-col max-w-[200px] max-h-[200px] mt-2">
                              <span className="text-base font-normal mb-2 text-black">
                                {destination}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white min-1200:w-1/2 w-screen self-start rounded-sm p-4 sticky top-20 border h-fit">
                    <p className="font-bold text-lg">Fare Summary</p>
                    <div className="border-b border-black">
                      <div className="border-b border-[#dfdfdf] py-3">
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex justify-center items-center">
                            <div className="mt-1 mr-2 flex items-center gap-2 cursor-pointer">
                              <div className="text-base font-semibold">
                                Base Fare
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-[#4a4a4a]">
                              ₹ {fare * seatsArray.length}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-[#dfdfdf] py-3">
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex justify-center items-center">
                            <div className="mt-1 mr-2 flex items-center gap-2 cursor-pointer">
                              <div className="text-base font-semibold">
                                Extra Taxes
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-[#4a4a4a]">
                            ₹ {Math.ceil((fare * seatsArray.length * 16) / 100)}
                          </div>
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
                          {fare * seatsArray.length +
                            Math.ceil((fare * seatsArray.length * 16) / 100)}
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

export default BusBook;
