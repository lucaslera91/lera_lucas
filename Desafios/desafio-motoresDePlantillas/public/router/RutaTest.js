const express = require("express");
const routerTest = express.Router();

routerTest.get('/', (req,res) => {
    res.render('hello2.pug', {mensaje: 'Pug con app.use ja!'})

})
//routerTest.get('/:id', api.getProducto)
//routerTest.post('/', api.agregarProducto)
//routerTest.put('/:id', api.modificarProducto)
//routerTest.delete('/:id', api.eliminarProducto)

module.exports = routerTest;