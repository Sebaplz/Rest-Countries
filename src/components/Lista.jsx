import Card from "./Card";
import useFetch from "../hooks/useFetch";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useState } from "react";

function Lista() {
  const [searchText, setSearchText] = useState("");
  const [url, setUrl] = useState(
    "https://restcountries.com/v3.1/all?fields=name,population,capital,region,flags"
  );
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const [selectedRegion, setSelectedRegion] = useState("");

  const {
    getCurrentPageCountries,
    handleNextPage,
    currentPage,
    handlePrevPage,
    itemsPerPage,
    countries,
    handleItemsPerPageChange,
    totalPages,
    error,
    setError,
    isLoading,
  } = useFetch(url);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    setError("");
    setSelectedRegion("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim() === "") {
      setUrl(
        "https://restcountries.com/v3.1/all?fields=name,population,capital,region,flags"
      );
      setSelectedRegion("");
    } else {
      setUrl(
        `https://restcountries.com/v3.1/name/${searchText}?fullText=true&fields=name,population,capital,region,flags`
      );
      setSelectedRegion("");
    }
  };

  const handleRegionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedRegion(selectedValue);
    setUrl(
      `https://restcountries.com/v3.1/region/${selectedValue}?fields=name,population,capital,region,flags`
    );
    setSearchText("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h2 className="text-white">Cargando...</h2>
      </div>
    );
  } else {
    return (
      <main className="text-white">
        <div className="flex justify-between flex-wrap px-10 py-5">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-[#2B3945] rounded-lg"
          >
            <button className="ml-2 p-4">
              <FaSearch />
            </button>
            <input
              className="text-white bg-[#2B3945] p-2 w-60 lg:w-80 rounded-r-lg"
              type="text"
              placeholder="Search for a country..."
              value={searchText}
              onChange={handleInputChange}
            />
          </form>
          <div className="mt-4 md:mt-0">
            <select
              className="bg-[#2B3945] rounded-lg p-4 cursor-pointer"
              value={selectedRegion}
              onChange={handleRegionChange}
            >
              <option value="" disabled>
                Filter by region
              </option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-red-600 ml-10">{error}</p>
        {/* Renderizar los países de la página actual */}
        <ul className="p-4 gap-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center">
          {getCurrentPageCountries().map((country) => (
            <Card key={country.name.official} country={country} />
          ))}
        </ul>
        <div>
          {/* Controles de paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 flex-wrap mt-4">
              <button
                onClick={() => {
                  handlePrevPage();
                }}
                disabled={currentPage === 1}
                className="flex items-center gap-2 disabled:hidden"
              >
                <FaArrowLeft />
                Anterior
              </button>
              <span>Página {currentPage}</span>
              {/* Verificar si hay más países para mostrar en la siguiente página */}
              <button
                onClick={() => {
                  handleNextPage();
                }}
                disabled={currentPage * itemsPerPage >= countries.length}
                className="flex items-center gap-2 disabled:hidden"
              >
                Siguiente
                <FaArrowRight />
              </button>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-[#2B3945] ml-4 rounded-lg"
              >
                <option value={5}>5 por página</option>
                <option value={10}>10 por página</option>
                <option value={20}>20 por página</option>
              </select>
            </div>
          )}
          <div className="flex justify-center py-4">
            <p>Total de Páginas {totalPages}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Lista;
