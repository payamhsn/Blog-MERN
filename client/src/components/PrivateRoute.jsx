import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  //
  //Outlet is here to render children of Route element in app.jsx file, which is dashboard route :

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
