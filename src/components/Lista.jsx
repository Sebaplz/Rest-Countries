import Card from "./Card";
import useFetch from "../hooks/useFetch";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useState } from "react";

function Lista() {
  const [searchText, setSearchText] = useState("");
  const [url, setUrl] = useState("https://restcountries.com/v3.1/all");

  const {
    getCurrentPageCountries,
    handleNextPage,
    currentPage,
    handlePrevPage,
    itemsPerPage,
    countries,
    handleItemsPerPageChange,
    totalPages,
  } = useFetch(url);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim() === "") {
      setUrl("https://restcountries.com/v3.1/all");
    } else {
      setUrl(`https://restcountries.com/v3.1/name/${searchText}`);
    }
  };

  return (
    <>
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
        <div>lista de regiones</div>
      </div>
      {/* Renderizar los países de la página actual */}
      <ul className="p-4 gap-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center">
        {getCurrentPageCountries().map((country) => (
          <Card key={country.name.official} country={country} />
        ))}
      </ul>
      <div>
        {/* Controles de paginación */}
        {totalPages > 1 ? (
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
        ) : (
          ""
        )}

        <div className="flex justify-center py-4">
          <p>Total de Páginas {totalPages}</p>
        </div>
      </div>
    </>
  );
}

export default Lista;
