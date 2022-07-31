const express = require("express");
const routerProductos = express.Router();
const filepath = "productos.txt";

const ApiManager = require('../api')
const api = new ApiManager(filepath);

routerProductos.get('/', api.fetchProductos)
routerProductos.get('/:id', api.getProducto)
routerProductos.post('/', api.agregarProducto)
routerProductos.put('/:id', api.modificarProducto)
routerProductos.delete('/:id', api.eliminarProducto)

module.exports = routerProductos;