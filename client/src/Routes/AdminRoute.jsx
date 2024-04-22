import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";

export const AdminRoute = () => {
  const [auth, setAuth] = useAuth();

  // Conditional rendering based on auth.token
  return auth?.token && auth?.userdata.organizer ? <Outlet /> : <Spinner />;
};
