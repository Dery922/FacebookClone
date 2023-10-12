import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

/** the Outlet allow you to access another elements inside another routes */

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Outlet /> : <Login />;
}
