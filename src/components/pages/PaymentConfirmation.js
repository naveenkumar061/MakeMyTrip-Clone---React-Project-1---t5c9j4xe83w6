import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import mmtlogo from '../assets/images/logommt.png';
import safe from '../assets/images/safe.png';
import gpay from '../assets/images/gpaylogo.png';
import bhim from '../assets/images/bhim.png';
import debit from '../assets/images/debit.png';
import book from '../assets/images/book.png';
import banking from '../assets/images/banking.png';
import gift from '../assets/images/gift card.png';
import emi from '../assets/images/emi.png';
import phonepay from '../assets/images/phonepay.png';
import paytm from '../assets/images/paytm.png';
import upiqr from '../assets/images/upiqrcode.png';
import { Modal } from '@mui/material';
import Booking from './Booking';

function PaymentConfirmation() {
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  function onSubmit(data) {
    console.log(data);
    setOpenModal(true);
  }

  return (
    <div className="h-auto">
      <div className="h-[180px] bg-gradient-to-t from-[#15457b] to-[#051423] flex flex-row justify-between pt-[10px] pl-[350px]">
        <div className="cursor-default flex flex-row h-9 justify-center items-center gap-8">
          <img alt="scrollLogo" src={mmtlogo} className="h-8" />
          <p className="text-teal-500 text-base font-bold">
            <span className="text-white">Hey,</span> You are viewing this
            booking at the best price
          </p>
        </div>
        <div className="cursor-default pr-[22rem] h-[36px] flex flex-row items-center">
          <img src={safe} alt="safe" className="h-6" />
          <p className="text-[12px] font-bold text-white">SAFE & SECURE</p>
        </div>
      </div>

      <div className="mx-auto -mt-[120px] flex flex-row pl-[350px] mb-4">
        <div className="w-[270px] bg-[#eaf5ff] transition-all duration-400 ease-in-out flex flex-col items-start">
          <p className="text-lg m-0 font-bold py-[15px] px-[20px]">
            Payment options
          </p>
          <ul className="list-none flex flex-col items-start p-0 m-0">
            <li className="border-t cursor-pointer border-l-[#008cff] border-t-[#dfdfdf] border-l-4 p-4 flex flex-row bg-white w-full">
              <img src={bhim} alt="bhim" className="w-6 h-6 mr-3" />
              <div className="flex flex-col items-start gap-[3px]">
                <p className="font-bold mr-2 mb-0 p-0 text-base text-[#008cff]">
                  UPI Options
                </p>
                <p className="m-0 p-0 text-[#4a4a4a] text-xs font-extrabold text-left h-7">
                  Pay Directly From Your Bank Account
                </p>
              </div>
            </li>
            <li className="cursor-not-allowed border-t border-l-4 border-t-[#dfdfdf] border-l-[#eaf5ff] p-[15px] pl-[20px] pr-[20px] flex flex-row">
              <img src={debit} alt="debit" className="w-6 h-6 mr-3" />
              <div className="flex flex-col items-start gap-[3px]">
                <p className="font-bold mr-2 mb-0 p-0 text-base text-[#008cff]">
                  Credit/Debit/ATM Card
                </p>
                <p className="m-0 p-0 text-[#4a4a4a] text-xs font-extrabold text-left h-7">
                  Visa, MasterCard, Amex, Rupay And More
                </p>
              </div>
            </li>
            <li className="cursor-not-allowed border-t border-l-4 border-t-[#dfdfdf] border-l-[#eaf5ff] p-[15px] pl-[20px] pr-[20px] flex flex-row">
              <img src={book} alt="book" className="w-6 h-6 mr-3" />
              <div className="flex flex-col items-start gap-[3px]">
                <p className="font-bold mr-2 mb-0 p-0 text-base text-[#008cff]">
                  Book Now Pay Later
                </p>
                <p className="m-0 p-0 text-[#4a4a4a] text-xs font-extrabold text-left h-7">
                  Tripmoney, Lazypay, Simpl, ZestMoney, ICICI, HDFC
                </p>
              </div>
            </li>
            <li className="cursor-not-allowed border-t border-l-4 border-t-[#dfdfdf] border-l-[#eaf5ff] p-[15px] pl-[20px] pr-[20px] flex flex-row w-full">
              <img src={banking} alt="banking" className="w-6 h-6 mr-3" />
              <div className="flex flex-col items-start gap-[3px]">
                <p className="font-bold mr-2 mb-0 p-0 text-base text-[#008cff]">
                  Net Banking
                </p>
                <p className="m-0 p-0 text-[#4a4a4a] text-xs font-extrabold text-left h-7">
                  All Major Banks Available
                </p>
              </div>
            </li>
            <li className="cursor-not-allowed border-t border-l-4 border-t-[#dfdfdf] border-l-[#eaf5ff] p-[15px] pl-[20px] pr-[20px] flex flex-row w-full">
              <img src={gift} alt="gift" className="w-6 h-6 mr-3" />
              <div className="flex flex-col items-start gap-[3px]">
                <p className="font-bold mr-2 mb-0 p-0 text-base text-[#008cff]">
                  Gift Cards, Wallets & More
                </p>
                <p className="m-0 p-0 text-[#4a4a4a] text-xs font-extrabold text-left h-7">
                  Gift cards, AmazonPay
                </p>
              </div>
            </li>
            <li className="cursor-not-allowed border-t border-l-4 border-t-[#dfdfdf] border-l-[#eaf5ff] p-[15px] pl-[20px] pr-[20px] flex flex-row w-full">
              <img src={emi} alt="emi" className="w-6 h-6 mr-3" />
              <div className="flex flex-col items-start gap-[3px]">
                <p className="font-bold mr-2 mb-0 p-0 text-base text-[#008cff]">
                  EMI
                </p>
                <p className="m-0 p-0 text-xs font-bold text-left h-7 text-orange-400">
                  No Cost EMI available
                </p>
              </div>
            </li>
            <li className="cursor-not-allowed border-t border-l-4 border-t-[#dfdfdf] border-l-[#eaf5ff] p-[15px] pl-[20px] pr-[20px] flex flex-row w-full">
              <img src={gpay} alt="gpay" className="w-6 h-6 mr-3" />
              <div className="flex flex-col items-start gap-[3px]">
                <p className="font-bold mr-2 mb-0 p-0 text-base text-[#008cff]">
                  GooglePay
                </p>
                <p className="m-0 p-0 text-[#4a4a4a] text-xs font-extrabold text-left h-7">
                  Pay with Google Pay
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-[37vw] p-5 pr-7.5 relative border-r border-b border-gray-300 bg-white rounded-tl-none rounded-tr-lg rounded-br-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start"
          >
            <div className="flex flex-row items-center mb-3">
              <p className="text-[#f09819] text-[12px] p-0 m-0 font-bold">
                Keep your phone handy!
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded border border-[#d8d8d8] p-5 mb-5">
              <div className="flex flex-row justify-between mb-5">
                <div className="flex flex-col items-center w-[200px] justify-center">
                  <p className="mb-5 text-sm font-bold">Scan and pay</p>
                  <div className="cursor-not-allowed mb-7 w-30 h-32 rounded-[7px] relative border border-[#979797] p-1.5">
                    <img
                      src={upiqr}
                      alt="upi qr code"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="font-bold mx-5 text-xs p-1.5">
                    Scan and pay using any banking app
                  </p>
                </div>
                <div className="text-[#249b95] flex items-center justify-center mr-[30px]">
                  <span className="text-xs rounded-full bg-teal-200 my-[-22px] mx-auto border-10 border-white h-6 w-6 flex items-center justify-center">
                    OR
                  </span>
                </div>
                <div className="flex flex-col justify-between items-start h-[250px]">
                  <p className="text-black font-bold mb-2 text-sm">
                    Enter UPI ID
                  </p>
                  <div className="w-full flex flex-col h-[180px]">
                    <input
                      type="text"
                      placeholder="mobileNumber@upi"
                      name="upiId"
                      className="w-full text-sm outline-none border border-gray-600 rounded p-3.5 text-black bg-transparent font-bold"
                      {...register('upiId', {
                        required: 'UPI is required',
                        pattern: {
                          value: /^[0-9]+@upi$/,
                          message:
                            'Invalid UPI format. Use the format number@upi.',
                        },
                      })}
                    />
                    {errors.upiId && (
                      <span className="mt-1 text-[12px] text-red-500 w-full">
                        {errors.upiId.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="shadow-sm text-white cursor-pointer h-14 w-[150px] px-5 font-bold flex items-center justify-center border-none rounded-full mx-6 disabled:bg-[#c3c2c2] disabled:cursor-default"
                    style={{
                      backgroundImage: isValid
                        ? 'linear-gradient(96deg, #53b2fe, #065af3)'
                        : '',
                    }}
                    disabled={!isValid}
                    onClick={handleSubmit(onSubmit)}
                  >
                    VERIFY & PAY
                  </button>
                  <ul className="flex flex-col list-none">
                    <li className="text-[#9b9b9b] mb-2 text-xs text-left font-bold">
                      Enter your registered VPA
                    </li>
                    <li className="text-[#9b9b9b] mb-2 text-xs text-left font-bold">
                      Receive payment request on bank app
                    </li>
                    <li className="text-[#9b9b9b] mb-2 text-xs text-left font-bold">
                      Authorize payment request
                    </li>
                  </ul>
                </div>
              </div>
              <ul className="flex flex-row justify-center items-center list-none">
                <img src={gpay} alt="gpay" className="w-6 h-6 mr-3" />
                <img src={phonepay} alt="phonepay" className="w-6 h-6 mr-3" />
                <img src={bhim} alt="bhim" className="w-6 h-6 mr-3" />
                <img src={paytm} alt="paytm" className="w-6 h-6 mr-3" />
              </ul>
            </div>
            <p className="text-left text-xs p-0 m-0 font-black">
              By continuing to pay, I understand and agree with the{' '}
              <span className="text-[#008cff]">privacy policy</span>, the{' '}
              <span className="text-[#008cff]">user agreement</span>, and{' '}
              <span className="text-[#008cff]">terms of service</span> of
              MakeMyTrip.
            </p>
          </form>
        </div>
      </div>
      <Modal open={openModal} close={() => setOpenModal(false)}>
        <Booking close={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}

export default PaymentConfirmation;
