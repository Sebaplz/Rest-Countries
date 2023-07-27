import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
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

  function obtenerNombresIdiomas(languages) {
    return Object.values(languages);
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
      <div className="bg-[#202C37] min-h-screen">
        <Navbar />
        <main className="flex flex-col gap-4 mx-8">
          <Link
            to="/"
            className="text-white bg-[#2B3945] flex items-center justify-center gap-2 px-4 py-2 w-28 rounded-lg mt-10"
          >
            <FaArrowLeft />
            Back
          </Link>
          <p className="text-red-600">{error}</p>
          {country.map((c) => (
            <div
              key={c.name.common}
              className="flex flex-col lg:flex-row items-center"
            >
              <img src={c.flags.png} alt="" className="w-[320px] h-[220px]" />
              <div className="flex flex-col gap-4 text-white w-full">
                <h2 className="text-xl font-bold mt-4">{c.name.common}</h2>
                <h3>
                  Native Name: <span>{obtenerNombreComun(c)}</span>
                </h3>
                <h3>
                  Population: <span>{c.population.toLocaleString()}</span>
                </h3>
                <h3>
                  Region: <span>{c.region}</span>
                </h3>
                <h3>
                  Sub Region: <span>{c.subregion}</span>
                </h3>
                <h3>
                  Capital: <span>{c.capital[0]}</span>
                </h3>
              </div>
              <div className="mt-10 flex flex-col gap-4 text-white">
                <h3>
                  Top Level Domain: <span>{c.tld[0]}</span>
                </h3>
                <h3>
                  Currencies:{" "}
                  <span>{obtenerMonedas(c.currencies)[0].name}</span>
                </h3>
                <h3>
                  Languages: <span>{obtenerNombresIdiomas(c.languages)}</span>
                </h3>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}
export default Country;
