import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Card({ country }) {
  return (
    <Link to={`/country/${country.name.common}`}>
      <li className="flex flex-col w-[300px] h-[360px]">
        <img
          src={country.flags.png}
          alt={
            country.flags.alt
              ? country.flags.alt
              : `Bandera de ${country.name.common}`
          }
          className="w-[300px] h-[200px] rounded-t-md"
        />
        <div className="flex flex-col items-start p-4 bg-white dark:bg-[#2B3945] rounded-b-md pt-2 text-black dark:text-white shadow">
          <h2 className="font-bold text-xl break-words mt-2">
            {country.name.common}
          </h2>
          <h4 className="font-semibold mt-4">
            Population:{" "}
            <span className="font-normal">
              {country.population.toLocaleString()}
            </span>
          </h4>
          <h4 className="font-semibold">
            Region: <span className="font-normal">{country.region}</span>
          </h4>
          <h4 className="font-semibold">
            Capital:{" "}
            <span className="font-normal">
              {country.capital[0] ? country.capital[0] : "Not Specified"}
            </span>
          </h4>
        </div>
      </li>
    </Link>
  );
}

export default Card;
