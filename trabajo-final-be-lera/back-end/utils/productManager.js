const req = require("express/lib/request");
const fs = require("fs");
const filepath = "productos.txt";
require("dotenv").config();
console.log(process.env.RUTAMOTORPRODUCTOS);
const getProductos = async () => {
  const archivo = await fs.promises.readFile(filepath, "utf-8");
  return archivo;
};

module.exports = class ApiManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async fetchProductos(req, res) {
    const data = await getProductos();
    //return res.json({ productos: JSON.parse(data).productos });
    //console.log(JSON.parse(data).productos)
    //return res.render(process.env.RUTAMOTORPRODUCTOS, { productos: JSON.parse(data).productos });
    return JSON.parse(data).productos;
  }
  //process.env.RUTAMOTOR
  async getProducto(req, res) {
    const data = await getProductos();
    const productos = JSON.parse(data).productos;
    const producto = productos.filter(
      (producto) => Number(producto.id) === Number(req.params.id)
    );

    producto.length == 0
      ? //res.render("productos.pug", { productos: JSON.parse(data).productos })
        //res.render("productos.pug", { productos: JSON.parse(data).productos });
        res.json({ msg: "El producto no existe" })
      : res.json({ productos: producto });
  }

  async agregarProducto(req, res, obj) {
    console.log(req.body);
    const data = await getProductos();
    const productos = JSON.parse(data).productos;
    //console.log(req.body)
    let object = req.body ?? obj;
    try {
      const ids = productos.map((producto) => producto.id);
      const max = Math.max(...ids);
      object.id = max + 1;
      productos.push(object);
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ productos: productos })}`
      );
      return res.json({
        productos,
      });
    } catch (error) {
      console.log(error);
    }

    //return res.json({ productos: productos });
    return {
      productos: JSON.parse(data).productos,
    };
  }

  async modificarProducto(req, res) {
    const data = await getProductos();
    const productos = JSON.parse(data).productos;
    let isProducto = false;
    console.log();
    const productosActualizados = productos.map((producto) => {
      if (Number(producto.id) === Number(req.params.id)) {
        const prodAux = {
          title: req.body.title,
          price: req.body.price,
          thumbnail: req.body.thumbnail,
          id: producto.id,
        };
        isProducto = true;
        console.log(prodAux);
        return prodAux;
      } else {
        return producto;
      }
    });
    if (isProducto) {
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ productos: productosActualizados })}`
      );
      //return res.json({ productos: productosActualizados });
      return res.json({
        productos: productosActualizados,
      });
    } else {
      return res.json({ msg: "Producto no existe" });
    }
  }
  async eliminarProducto(req, res) {
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
      return res.json({
        productos: listaActualizada,
      });
      return res.json({ productos: listaActualizada });
    } else {
      //eturn res.json({ msg: "Producto no existe" });
      return res.json({
        msg: "Productos no existe",
      });
    }
  }
};
