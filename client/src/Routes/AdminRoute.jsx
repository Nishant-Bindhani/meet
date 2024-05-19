import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import OrgSpinner from "./OrgSpinner";
import { useEffect } from "react";

export const AdminRoute = () => {
  const [auth, setAuth] = useAuth();

  // Conditional rendering based on auth.token
  return auth?.userdata?.organizer ? <Outlet /> : <OrgSpinner />;
};
