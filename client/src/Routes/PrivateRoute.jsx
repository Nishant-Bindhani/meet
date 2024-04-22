import { useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";

export const PrivateRoute = () => {
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    if (auth?.token) {
      return <Outlet />;
    } else {
      return <Spinner />;
    }
  }, [auth?.token]);
};
