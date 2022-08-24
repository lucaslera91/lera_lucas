export const createCartId = async () => {
  //if (localStorage.getItem('cartId'))
  const auxId = await createCartService();
  localStorage.setItem("cartId", auxId[auxId.length - 1].id);
  console.log(localStorage.getItem("cartId"));
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
    console.log(res.carrito);
    return res.carrito;
  } catch (error) {
    console.log(error);
  }
};
