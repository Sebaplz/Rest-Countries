import { useState, useEffect } from "react";
import data from "../mocks/data.json";

function useFetch() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setCountries(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reiniciar la página al cambiar el número de items por página
  };

  // Función para obtener los países de la página actual
  const getCurrentPageCountries = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return countries.slice(startIndex, endIndex);
  };

  // Calcular el total de páginas
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  // Devolver los datos y la función de actualización del estado de la página actual
  return {
    currentPage,
    handleNextPage,
    handlePrevPage,
    handleItemsPerPageChange,
    getCurrentPageCountries,
    totalPages,
    itemsPerPage,
    countries,
    setCurrentPage, // Agregamos la función de actualización del estado de la página actual
  };
}

export default useFetch;
