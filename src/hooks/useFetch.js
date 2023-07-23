import { useState, useEffect } from "react";

function useFetch(url) {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [error, setError] = useState("");

  async function fetchData(url) {
    try {
      const response = await fetch(url);

      if (response.status == 404) {
        // Si la respuesta de la API no es satisfactoria (por ejemplo, 404 Not Found), lanzar un error personalizado
        throw new Error(
          `Error: ${response.status} - ${response.statusText} the Country`
        );
      }

      const data = await response.json();
      setCountries(data);
      /* console.log(data); */
    } catch (error) {
      setError(error.message);
      // Aquí puedes manejar el error de la manera que desees, por ejemplo, mostrando un mensaje de error en la interfaz del usuario
    }
  }

  useEffect(() => {
    fetchData(url);
    setCurrentPage(1);
  }, [url]);

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
    if (countries.length === 0) {
      return []; // O puedes retornar un valor por defecto si lo deseas
    }

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
    error,
    setError,
  };
}

export default useFetch;
