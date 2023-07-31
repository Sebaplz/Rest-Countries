import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function LayoutPiblic() {
  return (
    <div className="bg-[#202C37] min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default LayoutPiblic;
