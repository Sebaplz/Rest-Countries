import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

function Country() {
  const { countryName } = useParams();

  useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      <h2>Cargar la data del pais {countryName}</h2>
    </>
  );
}
export default Country;
