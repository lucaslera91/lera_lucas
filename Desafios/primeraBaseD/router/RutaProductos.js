const express = require("express");
const ProductManager = require("../utils/productManager");
const routerProductos = express.Router();
const filepath = "productos.txt";
const knex = require("knex");
const knexConfig = require("../knexfileMySql");
const database = knex(knexConfig);
const tableName = "productos";
const productManager = new ProductManager(filepath);

routerProductos.get("/", productManager.getProductos);

// routerProductos.get('/', async (req, res) => {
//     return res.render("index");
// } )
routerProductos.get('/:id', productManager.getProducto)
routerProductos.post("/", productManager.agregarProducto);
routerProductos.put('/:id', productManager.modificarProducto)
routerProductos.delete('/:id', productManager.eliminarProducto)

module.exports = routerProductos;
