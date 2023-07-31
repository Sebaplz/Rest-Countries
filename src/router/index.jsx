import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../pages/LayoutPublic";
import Dashboard from "../pages/Dashboard";
import Country from "../pages/Country";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "/country/:countryName",
            element: <Country />,
          },
        ],
      },
    ],
  },
]);
