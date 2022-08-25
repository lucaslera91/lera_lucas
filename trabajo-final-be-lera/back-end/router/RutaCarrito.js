const express = require("express");
const CartManager = require("../utils/cartManager");
const routerCart = express.Router();
const filepath = "cart.txt";

const cartManager = new CartManager(filepath);

routerCart.get('/:id', cartManager.fetchProductos);
routerCart.post('/:id/productos', cartManager.agregarProductoCart)
routerCart.post('/', cartManager.createCart)
routerCart.delete('/:id_cart', cartManager.deleteCart)
routerCart.delete('/:id_cart/productos/:id_producto', cartManager.eliminarProductoCart)

module.exports = routerCart;