import { FaMoon } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="flex justify-between items-center lg:px-20 px-5 h-20 text-white bg-[#2B3945]">
      <h1>Where in the world?</h1>
      <ul>
        <li className="flex items-center gap-2 cursor-pointer">
          <FaMoon />
          <p>Dark Mode</p>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
