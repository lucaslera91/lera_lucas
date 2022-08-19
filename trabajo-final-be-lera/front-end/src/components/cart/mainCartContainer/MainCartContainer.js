import React, { useEffect } from "react";
import { CartConsumer } from "../../../context/CartProvider";
import CartList from "../cartList/CartList";

const MainCartContainer = () => {
  const { cart, getCart } = CartConsumer();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <CartList cartList={cart} />
    </div>
  );
};

export default MainCartContainer;
