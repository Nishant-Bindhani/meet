import { useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import OrgSpinner from "./OrgSpinner";

export const AdminRoute = () => {
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    if (auth?.token && auth?.userdata.organizer) {
      return <Outlet />;
    } else {
      return <OrgSpinner />;
    }
  }, [auth?.token]);
};
