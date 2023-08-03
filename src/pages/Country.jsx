import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function Country() {
  const { countryName } = useParams();
  const [country, setCountry] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCountry(url) {
    try {
      const response = await fetch(url);
      if (response.status == 404) {
        throw new Error(
          `Error: ${response.status} - ${response.statusText} the Country`
        );
      }
      const data = await response.json();
      setCountry(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  function obtenerNombreComun(datosPais) {
    // Utilizamos optional chaining para acceder a la propiedad nativeName
    const idiomasDisponibles =
      datosPais.name.nativeName?.[Object.keys(datosPais.name.nativeName)[0]];

    // Utilizamos nullish coalescing para obtener el nombre común del primer idioma disponible o el nombre común predeterminado.
    return idiomasDisponibles?.common || datosPais.name.common;
  }

  function obtenerMonedas(currencies) {
    return Object.values(currencies);
  }

  useEffect(() => {
    fetchCountry(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
  }, [countryName]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-white">Cargando...</h2>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4 p-8">
        <Link
          to="/"
          className="text-white bg-[#2B3945] flex items-center justify-center gap-2 px-4 py-2 w-28 rounded-lg"
        >
          <FaArrowLeft />
          Back
        </Link>
        <p className="text-red-600">{error}</p>
        {country.map((c) => (
          <div
            key={c.name.common}
            className="flex flex-col lg:flex-row lg: items-center gap-4"
          >
            <img
              src={c.flags.png}
              alt={c.flags.alt}
              className="w-[320px] h-[220px]"
            />
            <div className="flex flex-col gap-4 text-white w-full">
              <h2 className="text-xl font-bold mt-4">{c.name.common}</h2>
              <h3 className="font-semibold">
                Native Name:{" "}
                <span className="font-medium text-gray-300">
                  {obtenerNombreComun(c)}
                </span>
              </h3>
              <h3 className="font-semibold">
                Population:{" "}
                <span className="font-medium text-gray-300">
                  {c.population.toLocaleString()}
                </span>
              </h3>
              <h3 className="font-semibold">
                Region:{" "}
                <span className="font-medium text-gray-300">{c.region}</span>
              </h3>
              <h3 className="font-semibold">
                Sub Region:{" "}
                <span className="font-medium text-gray-300">{c.subregion}</span>
              </h3>
              <h3 className="font-semibold">
                Capital:{" "}
                <span className="font-medium text-gray-300">
                  {c.capital[0]}
                </span>
              </h3>
            </div>
            <div className="flex flex-col gap-4 text-white w-full mt-4">
              <h3 className="font-semibold">
                Top Level Domain:{" "}
                <span className="font-medium text-gray-300">{c.tld[0]}</span>
              </h3>
              <h3 className="font-semibold">
                Currencies:{" "}
                <span className="font-medium text-gray-300">
                  {obtenerMonedas(c.currencies)[0].name}
                </span>
              </h3>
              <h3 className="font-semibold">
                Languages:{" "}
                {Object.keys(c.languages).map((language, index) => (
                  <span key={language} className="font-medium text-gray-300">
                    {c.languages[language]}
                    {index !== Object.keys(c.languages).length - 1 ? ", " : ""}
                  </span>
                ))}
              </h3>
            </div>
            <div className="w-full">
              <h2 className="text-white font-semibold text-xl">
                Border Countries:
              </h2>
              <div className="flex gap-4">
                {c.borders && c.borders.length > 0 ? (
                  c.borders.map((border) => (
                    <h3
                      key={border}
                      className="text-white mt-4 py-1 px-4 bg-[#2B3945] rounded"
                    >
                      {border}
                    </h3>
                  ))
                ) : (
                  <h3 className="text-white mt-4 py-1 px-4 bg-[#2B3945] rounded">
                    No específica
                  </h3>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Country;
