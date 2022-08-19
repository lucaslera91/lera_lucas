const express = require("express");
const CartManager = require("../utils/cartManager");
const routerCart = express.Router();
const filepath = "cart.txt";

const cartManager = new CartManager(filepath);

routerCart.get('/', async (req, res) => {
    const data = await cartManager.fetchProductos()
    return res.json({ carrito: data });
});
routerCart.post('/', cartManager.agregarProductoCart)
//routerCart.put('/:id', cartManager.modificarProducto)
//routerCart.delete('/:id', cartManager.eliminarProducto)

module.exports = routerCart;