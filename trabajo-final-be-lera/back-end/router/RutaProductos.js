const express = require("express");
const ProductManager = require("../utils/productManager");
const routerProductos = express.Router();
const filepath = "productos.txt";

const productManager = new ProductManager(filepath);

routerProductos.get('/', async (req, res) => {
    const aux = await productManager.fetchProductos()
    return res.json(aux);
});

routerProductos.get('/:id', productManager.getProducto)
routerProductos.post('/', productManager.agregarProducto)
routerProductos.put('/:id', productManager.modificarProducto)
routerProductos.delete('/:id', productManager.eliminarProducto)

module.exports = routerProductos;