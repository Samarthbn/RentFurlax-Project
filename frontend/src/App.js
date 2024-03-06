import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import RegistrationForm from "./components/register/RegistrationForm";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import ProductPage from "./components/products/products";
import ProductDetails from "./components/product-details/ProductDetails";
import CheckoutPage from "./components/checkout/CheckoutPage";
import OrderPage from "./components/orders/OrderPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<RegistrationForm />} />
          <Route path="/signIn" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:categoryName" element={<ProductPage />} />
          <Route
            path="/details/:categoryName/:productId"
            element={<ProductDetails />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
