import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useFetch from "../hooks/useFetch";

// eslint-disable-next-line react/prop-types
function Pagination({ setCurrentPage }) {
  const {
    handleNextPage,
    currentPage,
    handlePrevPage,
    itemsPerPage,
    countries,
    handleItemsPerPageChange,
    totalPages,
  } = useFetch(); // Aquí también utilizamos el hook useFetch

  return (
    <>
      {/* Controles de paginación */}
      <div className="flex justify-center gap-2 flex-wrap mt-4">
        <button
          onClick={() => {
            handlePrevPage();
            setCurrentPage(currentPage - 1); // Actualizamos la página actual utilizando la función recibida como prop
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
            setCurrentPage(currentPage + 1); // Actualizamos la página actual utilizando la función recibida como prop
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
          className="bg-[#2B3945] ml-4"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
        </select>
      </div>
      <div className="flex justify-center py-4">
        <p>Total de Páginas {totalPages}</p>
      </div>
    </>
  );
}

export default Pagination;
