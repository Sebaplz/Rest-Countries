import { FaMoon } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="flex justify-between items-center lg:px-20 px-5 h-20 text-white bg-[#2B3945]">
      <h1 className="font-extrabold lg:text-2xl">Where in the world?</h1>
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
