import React from "react";
import CartCard from "../cartCard/CartCard";

const CartList = ({ cartList }) => {
  return (
    <div>
      {!cartList?.productos && <p>Loading..</p>}
      {cartList?.productos &&
        cartList?.productos.map((producto, idx) => (
          <CartCard key={idx} producto={producto} />
        ))}
    </div>
  );
};

export default CartList;
