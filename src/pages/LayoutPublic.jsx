import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function LayoutPiblic() {
  return (
    <div className="bg-[#202C37] min-h-screen">
      <Navbar />
      <main className="px-4 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
export default LayoutPiblic;
