// Import Modules
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./redux/adminSlice";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Axios from "axios";

// Import Pages for the User side
import Product from "./pages/user/Product";
import Home from "./pages/user/Home";
import ProductList from "./pages/user/ProductList";
import Register from "./pages/user/Register";
import RegisDone from "./pages/user/RegisDone";
import Login from "./pages/user/Login";
import Cart from "./pages/user/Cart";
import FPUser from "./pages/user/ForgetPassUs";
import RPUser from "./pages/user/ResetPassUs";
import VerifPage from "./pages/user/Verified";
import ProfileUser from "./pages/user/Profile";

// Import Pages for the Admin side
import AdminHome from "./pages/admin/home/Home";
import UserList from "./pages/admin/userList/UserList";
import User from "./pages/admin/user/User";
import NewUser from "./pages/admin/newUser/NewUser";
import AdminProductList from "./pages/admin/productList/ProductList";
import AdminProduct from "./pages/admin/product/Product";
import NewProduct from "./pages/admin/newProduct/NewProduct";
import AdminLogin from "./pages/admin/Login/Login";
import AdminForgetPassword from "./pages/admin/Forget Password/ForgetPassword";
import ResetPassword from "./pages/admin/Reset Password/ResetPassword";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";
import AdminRegister from "./pages/admin/Register/Register";
import VerifyAccount from "./pages/admin/verifyAccount/VerifyAccount";
import TransactionList from "./pages/admin/transactionList/TransactionList";

// Others
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResendToken from "./pages/admin/ResendToken/ResendToken";
import Reports from "./pages/admin/Reports/Reports";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      const user = jwt_decode(adminToken);
      dispatch(login(user));
    }
    Axios.get(process.env.REACT_APP_API + "/auth/user/keeplogin", {
      headers: { authorization: token },
      // Axios.get(process.env.REACT_APP_API + "/auth/admin/keeplogin", {
      // headers: { authorization: token },
    })
      .then((respond) => {
        dispatch(login(respond.data));
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const global = useSelector((state) => state.user);
  console.log("GLOBAL :", global);
  // const global = useSelector((state) => state.admin);
  // console.log("GLOBAL :", global);
  const { username } = useSelector((state) => state.admin);
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/forget-pass" element={<FPUser />} />
        <Route path="/user/reset-pass/:token" element={<RPUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/regisdone" element={<RegisDone />} />
        <Route path="/verified" element={<VerifPage />} />
        <Route path="/user/profile" element={<ProfileUser />} />

        <Route
          path="/admin"
          element={username ? <Navigate to="/admin/home" /> : <AdminLogin />}
        />
        <Route
          path="/admin/verify-account/:token"
          element={<VerifyAccount />}
        />
        <Route
          path="/admin/forget-password"
          element={
            username ? <Navigate to="/admin/home" /> : <AdminForgetPassword />
          }
        />
        <Route
          path="/admin/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/user/:userId" element={<User />} />
          <Route path="/admin/newUser" element={<NewUser />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/product/:productId" element={<AdminProduct />} />
          <Route path="/admin/newproduct" element={<NewProduct />} />
          <Route path="/admin/resendtoken" element={<ResendToken />} />
          <Route path="/admin/transactions" element={<TransactionList />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
