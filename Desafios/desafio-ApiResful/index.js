const PORT = 8080;
const express = require("express");
const { Router } = express;
const ApiManager = require("./api");
const app = express();
const router = Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const filepath = "productos.txt";

const api = new ApiManager(filepath);

api.getProductos(router);
api.getProducto(router);
api.eliminarProducto(router);
api.modificarProducto(router);
api.agregarProducto(router);
api.test(router);

app.use('/api', router)

app.listen(PORT, () => {
  console.log("Listening in port: ", PORT);
});

app.on("Error", (err) => console.log("Error: ", err));
