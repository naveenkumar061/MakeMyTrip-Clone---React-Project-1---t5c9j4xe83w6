import { Link } from 'react-router-dom';

function Booking({ close }) {
  return (
    <div className="z-50 fixed top-0 left-0 min-w-full min-h-full bg-black/75 flex flex-row justify-center items-center">
      <div class="bg-[#FFFFF0] flex flex-col items-center justify-center shadow-md rounded-2xl p-5">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          color="rgb(1, 150, 1)"
          height="60"
          width="60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
          ></path>
          <path
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M352 176L217.6 336 160 272"
          ></path>
        </svg>
        <h2 className="text-[37px] font-extrabold text-[#019601] m-[20px]">
          Payment Success!!!
        </h2>
        <p className="font-bold text-2xl">Your Booking is confirmed.</p>
        <Link className="m-[18px] text-[#4a98f8] font-extrabold" to="/trips">
          Check your booking here!
        </Link>
      </div>
    </div>
  );
}

export default Booking;
