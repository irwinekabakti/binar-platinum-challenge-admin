import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import LoginAdmin from "../pages/LoginAdmin";
import Dashboard from "../pages/Dashboard";
import Cars from "../pages/Cars";
import CarFormPage from "../pages/CarFormPage";

const Routes = () => {
  const { isAdminAuthenticated } = useSelector((state) => state.adminStore);

  return [
    /*
    { path: "/loginAdmin", element: <LoginAdmin /> },

    {
      path: "/",
      element: isAdminAuthenticated ? (
        <Dashboard />
      ) : (
        <Navigate to="/loginAdmin" />
      ),
    },

    {
      path: "/dashboard",
      element: isAdminAuthenticated ? (
        <Dashboard />
      ) : (
        <Navigate to="/loginAdmin" />
      ),
    },
    {
      path: "/cars",
      element: isAdminAuthenticated ? <Cars /> : <Navigate to="/loginAdmin" />,
    },
    {
      path: "/cars/edit/:id",
      element: isAdminAuthenticated ? (
        <CarFormPage currentPage="edit" />
      ) : (
        <Navigate to="/loginAdmin" />
      ),
    },
    {
      path: "/cars/add-new",
      element: isAdminAuthenticated ? (
        <CarFormPage currentPage="add" />
      ) : (
        <Navigate to="/loginAdmin" />
      ),
    },
    */

    { path: "/", element: <LoginAdmin /> },
    {
      path: "/dashboard",
      element: isAdminAuthenticated ? <Dashboard /> : <Navigate to="/" />,
    },
    {
      path: "/cars",
      element: isAdminAuthenticated ? <Cars /> : <Navigate to="/" />,
    },
    {
      path: "/cars/edit/:id",
      element: isAdminAuthenticated ? (
        <CarFormPage currentPage="edit" />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/cars/add-new",
      element: isAdminAuthenticated ? (
        <CarFormPage currentPage="add" />
      ) : (
        <Navigate to="/loginAdmin" />
      ),
    },
  ];
};

export default Routes;
