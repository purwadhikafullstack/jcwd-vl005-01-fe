import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminLogin from "../../pages/admin/Login/Login";

const useAuth = () => {
  const admin = useSelector((state) => state.admin.admin_id);
  return admin;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <AdminLogin />;
};

export default ProtectedRoutes;
