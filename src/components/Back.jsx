import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Back() {
  return (
    <Link
      to="/"
      className="text-black dark:text-white bg-white dark:bg-[#2B3945] flex items-center justify-center gap-2 px-4 py-2 w-28 rounded-lg shadow"
    >
      <FaArrowLeft />
      Back
    </Link>
  );
}
export default Back;
