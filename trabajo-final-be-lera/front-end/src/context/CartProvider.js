import React, { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartConsumer = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      const deleteProduct = await fetch(
        `http://localhost:8081/api/carrito`
      );
      const res = await deleteProduct.json();
      setCart(res.carrito);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CartContext.Provider value={{ cart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
