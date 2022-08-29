const filepath = "productos.txt";
require("dotenv").config();
console.log(process.env.RUTAMOTORPRODUCTOS);

const knex = require("knex");
const knexConfigMySql = require("../knexfileMySql");
const database = knex(knexConfigMySql);
const tableName = "productos";

module.exports = class ApiManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async getProductos(req, res) {
    try {
      const auxProd = await database(tableName).select();
      console.log(auxProd);
      //return res.json({ productos: auxProd });
      return res.render("./productos/productos", { productos: auxProd });
    } catch (error) {
      console.log(error);
      return res.json({ productos: error });
    }
  }

  async getProducto(req, res) {
    try {
      const producto = await database(tableName).where("id", req.params.id);
      producto.length === 0
        ? res.json({ producto: "no existe" })
        : res.json({ producto: producto });
    } catch (error) {
      res.json({ msg: error });
    }
  }

  async agregarProducto(req, res) {
    let object = req.body;
    object.id = parseInt(Math.random() * 1000);
    console.log(object);
    try {
      const producto = await database(tableName).insert(object);
      return res.json({ producto: producto });
    } catch (error) {
      console.log(error);
      return res.json({ msg: "El producto no se pudo crear" });
    }
  }

  async modificarProducto(req, res) {
    try {
      const producto = await database(tableName)
        .where("id", req.params.id)
        .update({
          nombre: req.body.nombre,
          precio: req.body.precio,
          thumbnail: req.body.thumbnail,
        });
      return res.json({ producto: producto });
    } catch (error) {
      console.log(error);
      return res.json({ msg: error });
    }
  }
  async eliminarProducto(req, res) {
    try {
      const producto = await database(tableName)
        .where("id", req.params.id)
        .del();
      producto === 0
        ? res.json({ producto: "El producto no existe" })
        : res.json({ producto: producto });
    } catch (error) {
      return res.json({ msg: error });
    }
  }
};
