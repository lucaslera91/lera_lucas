const express = require("express");
const ProductManager = require("../productManager");
const routerProductos = express.Router();
const filepath = "productos.js";

const productManager = new ProductManager(filepath);

routerProductos.get('/', productManager.fetchProductos)
routerProductos.get('/:id', productManager.getProducto)
routerProductos.post('/', productManager.agregarProducto)
routerProductos.put('/:id', productManager.modificarProducto)
routerProductos.delete('/:id', productManager.eliminarProducto)

module.exports = routerProductos;