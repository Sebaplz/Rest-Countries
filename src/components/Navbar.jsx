import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 lg:px-8 h-20 text-white bg-[#2B3945]">
      <Link className="font-extrabold lg:text-2xl">Where in the world?</Link>
      <ul>
        <li className="flex items-center gap-2 cursor-pointer">
          <FaMoon />
          <p className="font-light">Dark Mode</p>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
