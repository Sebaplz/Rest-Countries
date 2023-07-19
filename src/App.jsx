import "./App.css";
import Navbar from "./components/Navbar";
import Lista from "./components/Lista";

function App() {
  return (
    <div className="bg-[#202C37] min-h-screen">
      <Navbar />
      <main className="text-white">
        <Lista />
      </main>
    </div>
  );
}

export default App;
