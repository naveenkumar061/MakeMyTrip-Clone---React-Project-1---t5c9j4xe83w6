import { getYear } from 'date-fns';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function FinalF() {
  const year = getYear(new Date());
  return (
    <div className="bg-black p-4 text-white flex flex-col items-center sm:flex-row justify-around">
      <div className="flex gap-4 justify-around w-1/2">
        <Link
          to="https://twitter.com/makemytrip/"
          className="text-2xl hover:text-gray-400"
        >
          <FaTwitter />
        </Link>
        <Link
          to="https://www.facebook.com/makemytrip/"
          className="text-2xl hover:text-gray-400"
        >
          <FaFacebookF />
        </Link>
      </div>
      <div className="flex gap-4 w-1/2 justify-around">
        <p>© {year} MAKEMYTRIP PVT. LTD.</p>
        <p>
          <span className="font-medium">Country</span> India
        </p>
      </div>
    </div>
  );
}

export default FinalF;
