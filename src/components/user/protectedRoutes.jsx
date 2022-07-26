import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../../pages/user/Login";

const useAuth = () => {
  const user = useSelector((state) => state.user.user_id);
  return user;
};

const ProtectedRoutesUser = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutesUser;
