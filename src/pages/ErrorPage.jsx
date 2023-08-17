import { useRouteError } from "react-router-dom";
import Back from "../components/Back";

const NotFound = () => {
  const error = useRouteError();
  return (
    <div className="flex justify-center items-center min-h-screen gap-4 bg-[#202C37] text-white">
      <Back />
      <h1 className="text-2xl">404</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};
export default NotFound;
