import Card from "./Card";
import useFetch from "../hooks/useFetch";
import Pagination from "./Pagination";

function Lista() {
  const { getCurrentPageCountries, setCurrentPage } = useFetch(); // Obtenemos la función de actualización del estado de la página actual

  // Pasamos la función de actualización del estado de la página actual al componente Pagination
  return (
    <>
      {/* Renderizar los países de la página actual */}
      <ul className="p-4 gap-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center">
        {getCurrentPageCountries().map((country) => (
          <Card key={country.numericCode} country={country} />
        ))}
      </ul>
      <Pagination setCurrentPage={setCurrentPage} />
    </>
  );
}

export default Lista;
