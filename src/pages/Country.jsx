import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Back from "../components/Back";

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
          `Error: ${response.status} - ${response.statusText} the Country ${countryName}`
        );
      }
      const data = await response.json();
      setCountry(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4 p-8">
        <Back />
        <p className="text-red-600">{error}</p>
        {country.map((c) => (
          <div
            key={c.name.common}
            className="flex flex-col xl:flex-row xl:items-center gap-4"
          >
            <img
              src={c.flags.png}
              alt={c.flags.alt || c.name.common}
              className="w-[320px] h-[220px] xl:w-[500px] xl:h-[400px] 2xl:w-[550px]"
            />
            <div className="xl:flex xl:flex-wrap xl:flex-1 text-black dark:text-white">
              <div className="flex flex-col gap-4 w-full xl:mx-8 xl:flex-1">
                <h2 className="text-xl font-bold mt-4 xl:text-4xl">
                  {c.name.common}
                </h2>
                <h3 className="font-semibold">
                  Native Name:{" "}
                  <span className="font-medium dark:text-gray-300">
                    {obtenerNombreComun(c)}
                  </span>
                </h3>
                <h3 className="font-semibold">
                  Population:{" "}
                  <span className="font-medium dark:text-gray-300">
                    {c.population.toLocaleString()}
                  </span>
                </h3>
                <h3 className="font-semibold">
                  Region:{" "}
                  <span className="font-medium dark:text-gray-300">
                    {c.region}
                  </span>
                </h3>
                {c.subregion ? (
                  <h3 className="font-semibold">
                    Sub Region:{" "}
                    <span className="font-medium dark:text-gray-300">
                      {c.subregion}
                    </span>
                  </h3>
                ) : (
                  <h3 className="font-semibold">
                    Sub Region:{" "}
                    <span className="font-medium dark:text-gray-300">
                      Not Specified
                    </span>
                  </h3>
                )}
                {c.capital ? (
                  <h3 className="font-semibold">
                    Capital:{" "}
                    <span className="font-medium dark:text-gray-300">
                      {c.capital}
                    </span>
                  </h3>
                ) : (
                  <h3 className="font-semibold">
                    Capital:{" "}
                    <span className="font-medium dark:text-gray-300">
                      Not Specified
                    </span>
                  </h3>
                )}
              </div>
              <div className="flex flex-col gap-4 w-full mt-4 xl:flex-1 xl:justify-center">
                <h3 className="font-semibold">
                  Top Level Domain:{" "}
                  <span className="font-medium dark:text-gray-300">
                    {c.tld[0]}
                  </span>
                </h3>
                {c.currencies ? (
                  <h3 className="font-semibold">
                    Currencies:{" "}
                    <span className="font-medium dark:text-gray-300">
                      {obtenerMonedas(c.currencies)[0].name}
                    </span>
                  </h3>
                ) : (
                  <h3 className="font-semibold">
                    Currencies:{" "}
                    <span className="font-medium dark:text-gray-300">
                      Not Specified
                    </span>
                  </h3>
                )}
                {c.languages ? (
                  <h3 className="font-semibold">
                    Languages:{" "}
                    {Object.keys(c.languages).map((language, index) => (
                      <span
                        key={language}
                        className="font-medium dark:text-gray-300"
                      >
                        {c.languages[language]}
                        {index !== Object.keys(c.languages).length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </h3>
                ) : (
                  <h3 className="font-semibold">
                    Languages:{" "}
                    <span className="font-medium dark:text-gray-300">
                      Not Specified
                    </span>
                  </h3>
                )}
              </div>
              <div className="w-full mt-4 xl:mx-8 xl:flex xl:items-center">
                <h2 className=" font-semibold text-xl">Border Countries:</h2>
                <div className="flex flex-wrap gap-4 xl:gap-0 xl:items-center">
                  {c.borders && c.borders.length > 0 ? (
                    c.borders.map((border) => (
                      <h3
                        key={border}
                        className="text-black dark:text-white mt-4 xl:mt-0 xl:ml-4 py-1 px-4 bg-white dark:bg-[#2B3945] rounded shadow"
                      >
                        {border}
                      </h3>
                    ))
                  ) : (
                    <h3 className="text-black dark:text-white mt-4 xl:mt-0 xl:ml-4 py-1 px-4 bg-white dark:bg-[#2B3945] rounded shadow">
                      Not Specified
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Country;
