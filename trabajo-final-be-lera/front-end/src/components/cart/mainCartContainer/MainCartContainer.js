import React, { useEffect } from "react";
import { CartConsumer } from "../../../context/CartProvider";
import { getCartId } from "../../../context/utils/cartContextUtils";
import CartList from "../cartList/CartList";

const MainCartContainer = () => {
  const { cart, createCartId, deleteCart, cartId, getCart } = CartConsumer();

  useEffect(() => {
    getCart()
    console.log(cart)
  }, [])
  return (
    <>
      {cartId === 0 && <button onClick={createCartId}>Create Cart</button>}
      {cartId != 0 && <button onClick={deleteCart}>Delete Cart</button>}
      {!cart && <h4>No cart</h4>}
      {cart && <div>
        <CartList cartList={cart} />
      </div>}
    </>
  );
};

export default MainCartContainer;
