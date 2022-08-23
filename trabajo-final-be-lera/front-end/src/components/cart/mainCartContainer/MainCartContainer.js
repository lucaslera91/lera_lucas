import React, { useEffect } from "react";
import { CartConsumer } from "../../../context/CartProvider";
import { getCartId } from "../../../context/utils/cartContextUtils";
import CartList from "../cartList/CartList";

const MainCartContainer = () => {
  const { cart, createCartId, deleteCart, cartId } = CartConsumer();

  // useEffect(() => {
  //   console.log(localStorage.getItem('cartId'))
  //   if (localStorage.getItem('cartId') === true){
  //     console.log('first')
  //     //getCart();
  //   } else {
  //     createCartId()
  //   }
  // }, [cart]);

  return (
    <>
      <button onClick={createCartId}>Create Cart</button>
      {cartId && <button onClick={deleteCart}>Delete Cart</button>}
      {!cart && <h4>No cart, create one!</h4>}
      {cart && <div>
        <CartList cartList={cart} />
      </div>}
    </>
  );
};

export default MainCartContainer;
