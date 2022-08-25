const req = require("express/lib/request");
const fs = require("fs");
const { runInNewContext } = require("vm");
const filepath = "cart.txt";
require("dotenv").config();
//console.log(process.env.RUTAMOTORPRODUCTOS);

const getCart = async () => {
  try {
    const archivo = await fs.promises.readFile(filepath, "utf-8");
    return archivo;
  } catch (error) {
    return { msg: error };
  }
};

module.exports = class CartManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async createCart(req, res) {
    const rawData = await getCart();
    const carts = JSON.parse(rawData).cart;
    const newCart = [...carts];

    newCart.push({
      id: parseInt(Math.random() * 3000).toString(),
      timestamp: Date.now(),
      productos: [],
    });
    console.log(newCart);
    await fs.promises.writeFile(
      filepath,
      `${JSON.stringify({ cart: newCart })}`
    );
    return res.json({ carrito: newCart });
  }

  async deleteCart(req, res) {
    const rawData = await getCart();
    const carts = JSON.parse(rawData).cart;
    carts.map((cart) => console.log(cart.id));
    const newCart = carts.filter((cart) => cart.id !== req.params.id_cart);
    await fs.promises.writeFile(
      filepath,
      `${JSON.stringify({ cart: newCart })}`
    );
    return res.json({ carrito: newCart });
  }

  async fetchProductos(req, res) {
    const rawData = await getCart();
    const data = JSON.parse(rawData).cart.filter(
      (cart) => cart.id === req.params.id
    );
    return res.json({ carrito: data });
  }

  async agregarProductoCart(req, obj) {
    const data = await getCart();
    const newData = JSON.parse(data);
    const carts = newData.cart;
    const id = req.body.cartId;
    const currentCart = carts.filter(
      (cart) => cart.id.toString() === id.toString()
    );
    let object = req.body.producto ?? obj;
    try {
      object.timestamp = Date.now();
      currentCart[0].productos.push(object);
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ cart: carts })}`
      );
      return { cart: carts };
    } catch (error) {
      console.log(error);
    }
    return {
      productos: JSON.parse(data).productos,
    };
  }

  async eliminarProductoCart(req, res) {
    try {
      const data = await getCart();
      const carts = JSON.parse(data).cart;
      const currentCart = carts.filter(
        (cart) => Number(cart.id) === Number(req.params.id_cart)
      );
      const productosAcutalizados = currentCart[0].productos.filter(
        (producto) =>
          producto.id.toString() !== req.params.id_producto.toString()
      );
      carts.forEach((cart) => {
        if (cart.id.toString() === req.params.id_cart.toString())
          cart["productos"] = productosAcutalizados;
      });
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ cart: carts })}`
      );
      return res.json({ carrito: carts });
    } catch (error) {
      console.log(error);
    }
  }
};
