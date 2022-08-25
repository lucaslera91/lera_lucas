export const createCartId = async () => {
  const auxId = await createCartService();
  localStorage.setItem("cartId", auxId[auxId.length - 1].id);
  return auxId[auxId.length - 1].id;
};

export const cartServiceGet = async (cartId) => {
  if (cartId) {
    try {
      const getProductoCart = await fetch(
        `http://localhost:8081/api/carrito/${cartId}`,
        { method: "GET", mode: "cors" }
      );
      const res = await getProductoCart.json();
      return res.carrito[0];
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
      },
    });
    const res = await createCart.json();
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
      },
    });
    const res = await deleteCart.json();
    return res.carrito;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductoCartService = async (id, idProducto) => {
  try {
    const deleteCart = await fetch(`http://localhost:8081/api/carrito/${id}/productos/${idProducto}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await deleteCart.json();
    return res.carrito;
  } catch (error) {
    console.log(error);
  }
};

///:id_cart/productos/:id_producto
export const cartServicePost = async (cartId, producto) => {
  try {
    const addToCart = await fetch(
      `http://localhost:8081/api/carrito/${cartId}/productos`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ cartId, producto }),
      }
    );
    const res = await addToCart.json();
    return res.carrito;
  } catch (error) {
    console.log(error);
  }
};
