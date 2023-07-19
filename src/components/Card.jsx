/* eslint-disable react/prop-types */
function Card({ country }) {
  return (
    <li key={country.numericCode} className="flex flex-col w-[300px] h-[360px]">
      <img
        src={country.flags.png}
        alt={`Bandera del país de ${country.name}`}
        className="w-[300px] h-[200px] rounded-t-md"
      />
      <div className="flex flex-col items-start p-4 bg-[#2B3945] rounded-b-md pt-2">
        <h2 className="font-bold text-xl break-words">{country.name}</h2>
        <h4 className="font-semibold mt-4">
          Population: <span className="font-normal">{country.population}</span>
        </h4>
        <h4 className="font-semibold">
          Region: <span className="font-normal">{country.region}</span>
        </h4>
        <h4 className="font-semibold">
          Capital: <span className="font-normal">{country.capital}</span>
        </h4>
      </div>
    </li>
  );
}

export default Card;
