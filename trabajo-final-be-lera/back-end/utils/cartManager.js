const req = require("express/lib/request");
const fs = require("fs");
const filepath = "cart.txt";
require("dotenv").config();
//console.log(process.env.RUTAMOTORPRODUCTOS);

const getCart = async () => {
  const archivo = await fs.promises.readFile(filepath, "utf-8");
  return archivo;
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
    console.log(req.params.id_cart);
    carts.map((cart) => console.log(cart.id));
    const newCart = carts.filter((cart) => cart.id !== req.params.id_cart);

    console.log(newCart);
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
    console.log(data)
    //return JSON.parse(data).cart;
    return res.json({carrito: data});
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
    const data = await getProductos();
    const productos = JSON.parse(data).productos;
    const listaActualizada = productos.filter(
      (producto) => Number(producto.id) !== Number(req.params.id)
    );

    if (listaActualizada.length < productos.length) {
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ productos: listaActualizada })}`
      );
      return res.render(process.env.RUTAMOTORPRODUCTOS, {
        productos: listaActualizada,
      });
      return res.json({ productos: listaActualizada });
    } else {
      //eturn res.json({ msg: "Producto no existe" });
      return res.render(process.env.RUTAMOTORPRODUCTOS, {
        msg: "Productos no existe",
      });
    }
  }

  async eliminarCart(req, res) {
    const data = await getProductos();
    const productos = JSON.parse(data).productos;
    const listaActualizada = productos.filter(
      (producto) => Number(producto.id) !== Number(req.params.id)
    );

    if (listaActualizada.length < productos.length) {
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ productos: listaActualizada })}`
      );
      return res.render(process.env.RUTAMOTORPRODUCTOS, {
        productos: listaActualizada,
      });
      return res.json({ productos: listaActualizada });
    } else {
      //eturn res.json({ msg: "Producto no existe" });
      return res.render(process.env.RUTAMOTORPRODUCTOS, {
        msg: "Productos no existe",
      });
    }
  }
};
