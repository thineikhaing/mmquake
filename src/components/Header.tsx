import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md px-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-bold text-orange-600 hover:underline"
      >
        Myanmar Earthquake
      </Link>
      <button
        onClick={() => navigate("/community-needs")}
        className="text-orange-600 text-orange text-xl l:text-base px-4 py-2 rounded hover:text-orange-700 transition flex items-center gap-2"
      >
        <img
          src="/images/submitReport.png"
          alt="Submit Icon"
          className="w-12 h-12"
        />
        Request A Needs
      </button>
    </header>
  );
};
export default Header;
