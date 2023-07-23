import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Country from "./pages/Country";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="country/:countryName" element={<Country />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
