import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LayoutUser from "./Layouts/LayoutUser.jsx";
import LayoutAdmin from "./Layouts/LayoutAdmin.jsx";
import Home from "./pages/Home/index.jsx";
import ProductList from "./pages/ProductList/index.jsx";
import Cart from "./pages/Cart/index.jsx";
import ProductDetail from "./pages/ProductDetail/index.jsx";
import News from "./pages/News/index.jsx";
import NewsDetail from "./pages/NewsDetail/index.jsx";
import Login from "./pages/Login/index.jsx";
import Signup from "./pages/Signup/index.jsx";
import Contact from "./pages/Contact/index.jsx";
import UserManagement from "./pages/Admin/User/index.jsx";
import CategoriesManagement from "./pages/Admin/Category/index.jsx";
import ProductsManagement from "./pages/Admin/Product/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="app" element={<App />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<UserManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="products" element={<ProductsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
