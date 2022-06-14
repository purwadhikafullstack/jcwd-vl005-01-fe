// Import Router from react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/forget-password" element={<ForgetPassword />} />
        <Route
          path="/admin/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/user/:userId" element={<User />} />
        <Route path="/admin/newUser" element={<NewUser />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/admin/product/:productId" element={<AdminProduct />} />
        <Route path="/admin/newproduct" element={<NewProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
