import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductDetail from "../components/productDetail/ProductDetail";
import CartProvider from "../context/CartProvider";
import Cart from "../views/Cart";
import Home from "../views/Home";
import Productos from "../views/Productos";

const RoutesFile = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductDetail />} />
            <Route path="/carrito" element={<Cart />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default RoutesFile;
