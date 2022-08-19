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

  async fetchProductos(req, res) {
    const data = await getCart();
    return JSON.parse(data).cart;
  }

  async agregarProductoCart(obj) {
    const data = await getCart();
    const productos = JSON.parse(data).cart.productos;
    //console.log(req.body)
    let object = req.body ?? obj
    try {
      const ids = productos.map((producto) => producto.id);
      const max = Math.max(...ids);
      object.id = max + 1;
      object.timestamp = Date.now();
      productos.push(object);
      data[productos] = productos
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ cart: data })}`
      );
      return { cart: data };
    } catch (error) {
      console.log(error);
    }

    //return res.json({ productos: productos });
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
