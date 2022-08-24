import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as service from "./utils/cartContextUtils";

export const CartContext = createContext();

export const CartConsumer = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'));

  const getCart = async () => {
    setCart(await service.cartServiceGet(cartId));
  };

  const createCartId = async() => {
    //const auxx = localStorage.getItem("cartId");
    setCartId(await service.createCartId());
  }

  const deleteCart = async (id) => {
    const aux = await service.deleteCartService(cartId)
    console.log(aux)
    localStorage.setItem('cartId', null)
    setCartId(0)
    console.log(cartId)
  }
  const deleteProductInCart = async (id) => {
    const aux = await service.deleteProductoCartService(cartId, id)
    console.log('Deleted con exito', aux)
    getCart()
  }


  const addToCart = async (body) => {
    console.log("first");
    console.log(body)
    const add = await service.cartServicePost(cartId, body);
    console.log(add);
    console.log("second");
  };

  return (
    <CartContext.Provider value={{ cart, getCart, cartId, createCartId, deleteCart, addToCart, deleteProductInCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
