import Card from "./Card";
import useFetch from "../hooks/useFetch";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useState } from "react";
import Spinner from "./Spinner";

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
        <Spinner />
      </div>
    );
  } else {
    return (
      <section className="text-[#858585] dark:text-white pb-12">
        <div className="flex justify-between flex-wrap py-5">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white dark:bg-[#2B3945] rounded-lg shadow"
          >
            <button className="ml-2 p-4">
              <FaSearch />
            </button>
            <input
              className="text-[#858585] dark:text-white bg-white dark:bg-[#2B3945] p-2 w-60 lg:w-80 xl:w-[450px] rounded-r-lg"
              type="text"
              placeholder="Search for a country..."
              value={searchText}
              onChange={handleInputChange}
              maxLength={30}
            />
          </form>
          <div className="mt-4 md:mt-0">
            <select
              className="bg-white dark:bg-[#2B3945] text-black dark:text-white rounded-lg p-4 cursor-pointer"
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
        <ul className="2xl:gap-20 xl:gap-14 gap-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center xl:place-content-between">
          {getCurrentPageCountries().map((country) => (
            <Card key={country.name.official} country={country} />
          ))}
        </ul>
        <div className="text-black dark:text-white">
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
                Previous
              </button>
              <span>Page {currentPage}</span>
              {/* Verificar si hay más países para mostrar en la siguiente página */}
              <button
                onClick={() => {
                  handleNextPage();
                }}
                disabled={currentPage * itemsPerPage >= countries.length}
                className="flex items-center gap-2 disabled:hidden"
              >
                Next
                <FaArrowRight />
              </button>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-white dark:bg-[#2B3945] ml-4 rounded-lg"
              >
                <option value={5}>5 per Page</option>
                <option value={10}>10 per Page</option>
                <option value={20}>20 per Page</option>
              </select>
            </div>
          )}
          <div className="flex justify-center py-4">
            <p>Total of Pages {totalPages}</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Lista;
