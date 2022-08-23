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
  const [cartId, setCartId] = useState("");

  //useEffect(() => {
    //const auxx = localStorage.getItem("cartId");
    //if (!auxx) setCartId(service.getCartId());
  //}, []);
  useEffect(()=>{
    console.log(cartId)
  }, [cartId])

  const getCart = async () => {
    setCart(await service.cartServiceGet(cartId));
  };

  const createCartId = async() => {
    //const auxx = localStorage.getItem("cartId");
    setCartId(await service.createCartId());
  }

  const deleteCart = async () => {
    const aux = await service.deleteCartService(cartId)
    console.log(aux)
    localStorage.setItem('cartId', null)
    setCartId(null)
    console.log(cartId)
  }


  const addToCart = async (body) => {
    console.log("first");
    //const add = await service.cartServicePost(body);
    //console.log(add);
    console.log("second");
  };

  return (
    <CartContext.Provider value={{ cart, getCart, cartId, createCartId, deleteCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
