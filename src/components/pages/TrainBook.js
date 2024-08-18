import { useEffect, useState } from 'react';
import { useLoginContext } from '../context/login/LoginContext';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from '../utils/Modal';
import Login from './Login';
import { useTrainBook } from './useTrainBook';
import { useTrainsMainContext } from '../context/Trains/TrainsMainContext';
import { addDays } from 'date-fns';

function TrainBook() {
  const [openModal, setOpenModal] = useState(false);

  const { isAuthenticated } = useLoginContext();

  const [searchParams] = useSearchParams();

  const fare = parseInt(searchParams.get('fare'), 10);
  const trainNumber = searchParams.get('trainNumber');
  const arrivalTime = searchParams.get('arrivalTime');
  const departureTime = searchParams.get('departureTime');
  const source = searchParams.get('source');
  const destination = searchParams.get('destination');
  const duration = searchParams.get('travelDuration');
  const coachType = searchParams.get('coachtype');
  const seats = searchParams.get('noOfSeats');
  const trainName = searchParams.get('trainName');
  const trainId = searchParams.get('trainId');

  const { date } = useTrainsMainContext();

  useEffect(() => {
    if (isAuthenticated) setOpenModal(false);
    else {
      toast.error('Please login to book a flight');
      setOpenModal(true);
    }
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { trainBooks } = useTrainBook();

  function onSubmit(data) {
    const trainObj = {
      trainId: trainId,
      startDate: new Date(date),
      endDate: addDays(new Date(date), 1),
    };

    trainBooks(trainObj);
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className="mt-16 pb-2"></div>
          <div className="w-full h-screen relative">
            <div className="bg-[#041422]">
              <p className="text-white font-bold min-1200:text-left z-10 text-xl text-center w-full sticky top-0 py-[20px] my-0 mx-auto min-1200:w-[1200px]">
                Select Travellers
              </p>
            </div>
            <div className="bg-gradient-to-t from-[#15457b] to-[#051423] min-h-48 absolute top-0 left-0 w-full"></div>
            <div className="pb-[100px] my-0 mx-auto bg-[#f4f4f4] min-h-screen">
              <div className="flex flex-col gap-4 relative min-1200:justify-center min-1200:items-center">
                <div className="flex flex-col min-1200:items-center gap-4 lg:flex-row min-1200:w-[1200px] lg:m-4">
                  <div className="bg-white w-screen p-5 gap-10 border rounded-sm">
                    <div className="py-3 rounded-sm shadow-[0_1px_4px_0_rgba(0,0,0,.21)] border border-[#e9e9e9]">
                      <div className="flex gap-[100px] m-5 w-full">
                        <div className="flex flex-col">
                          <p className="text-lg font-bold">{trainName}</p>
                          <p>#{trainNumber}</p>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p>{arrivalTime}</p>
                          <p className="text-lg font-bold">{source}</p>
                        </div>
                        <div>{duration}</div>
                        <div className="flex flex-col gap-[10px]">
                          <p>{departureTime}</p>
                          <p className="text-lg font-bold">{destination}</p>
                        </div>
                      </div>
                      <div className="flex gap-[100px] m-5 w-full">
                        <div className="flex flex-col gap-[10px]">
                          <p className="text-xs font-bold">
                            Availability Status
                          </p>
                          <div className="p-[10px] rounded flex gap-5 border border-black">
                            <p className="font-bold">{coachType}</p>
                            <p>AVAILABLE - {seats}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                          <p className="text-xs font-bold">
                            Your Boarding Station
                          </p>
                          <div className="p-[10px] rounded flex gap-5 border border-black">
                            <p>
                              {source} - {arrivalTime}
                            </p>
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
                              ₹ {fare}
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
                            ₹ {Math.ceil((fare * 16) / 100)}
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
                          ₹ {fare + Math.ceil((fare * 16) / 100)}
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

export default TrainBook;
