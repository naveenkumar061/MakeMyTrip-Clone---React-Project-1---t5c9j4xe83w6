// Import statements for React components and dependencies
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

// Footer component for displaying footer information
function Footer() {
  // Get current year
  const year = new Date().getFullYear();

  // Rendering footer content
  return (
    <div className="flex h-full items-center justify-between bg-black p-10 text-white">
      {/* Social media links */}
      <div className="flex gap-10">
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
      {/* Company information */}
      <div className="font-semibold">
        <p>© {year} MAKEMYTRIP PVT. LTD.</p>
        <p>
          <span className="font-medium">Country</span> India
        </p>
      </div>
    </div>
  );
}

export default Footer;
