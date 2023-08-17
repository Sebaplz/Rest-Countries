import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Navbar({ toggleDarkMode }) {
  return (
    <nav className="flex justify-between items-center px-4 lg:px-8 h-20 text-black dark:text-white bg-white dark:bg-[#2B3945] shadow">
      <Link className="font-extrabold lg:text-2xl">Where in the world?</Link>
      <ul>
        <li
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleDarkMode}
        >
          <FaMoon />
          <p className="dark:font-light font-semibold">Dark Mode</p>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
