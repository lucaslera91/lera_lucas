export const createCartId = async () => {
  //if (localStorage.getItem('cartId'))
  const auxId = await createCartService();
  localStorage.setItem("cartId", auxId[auxId.length - 1].id);
  return auxId[auxId.length - 1].id;
};

export const cartServiceGet = async (cartId) => {
  //console.log(`http://localhost:8081/api/carrito/${cartId}`);
  console.log(cartId);
  if (cartId) {
    try {
      const getProductoCart = await fetch(
        `http://localhost:8081/api/carrito/${cartId}`
      );
      const res = await getProductoCart.json();
      return res.carrito;
    } catch (error) {
      console.log(error);
    }
  }
};

export const createCartService = async () => {
  try {
    const createCart = await fetch(`http://localhost:8081/api/carrito`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const res = await createCart.json();
    console.log(res.carrito);
    return res.carrito;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCartService = async (id) => {
  try {
    const deleteCart = await fetch(`http://localhost:8081/api/carrito/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const res = await deleteCart.json();
    console.log(res.carrito);
    return res.carrito;
  } catch (error) {
    console.log(error);
  }
};
