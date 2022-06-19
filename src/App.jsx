// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./redux/adminSlice";
import { useEffect } from "react";
import Axios from "axios";

// Import Pages for the User side
import Product from "./pages/user/Product";
import Home from "./pages/user/Home";
import ProductList from "./pages/user/ProductList";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Cart from "./pages/user/Cart";

// Import Pages for the Admin side
import AdminHome from "./pages/admin/home/Home";
import UserList from "./pages/admin/userList/UserList";
import User from "./pages/admin/user/User";
import NewUser from "./pages/admin/newUser/NewUser";
import AdminProductList from "./pages/admin/productList/ProductList";
import AdminProduct from "./pages/admin/product/Product";
import NewProduct from "./pages/admin/newProduct/NewProduct";
import AdminLogin from "./pages/admin/Login/Login";
import ForgetPassword from "./pages/admin/Forget Password/ForgetPassword";
import ResetPassword from "./pages/admin/Reset Password/ResetPassword";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";

// Others
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(process.env.REACT_APP_API + "/auth/admin/keeplogin", {
      headers: { authorization: token },
    })
      .then((respond) => {
        dispatch(login(respond.data));
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const global = useSelector((state) => state.admin);
  console.log("GLOBAL :", global);
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/forget-password" element={<ForgetPassword />} />
        <Route
          path="/admin/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/user/:userId" element={<User />} />
          <Route path="/admin/newUser" element={<NewUser />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/product/:productId" element={<AdminProduct />} />
          <Route path="/admin/newproduct" element={<NewProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
