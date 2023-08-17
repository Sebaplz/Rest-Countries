import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
function LayoutPublic() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-[#FAFAFA] dark:bg-[#202C37] min-h-screen">
        <Navbar toggleDarkMode={toggleDarkMode} />
        <main className="px-4 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default LayoutPublic;
