const PORT = 8080;
const express = require("express");
const ApiManager = require('./api')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const filepath = "productos.txt";


const api = new ApiManager(filepath)

api.getProductos(app)
api.getProducto(app)
api.eliminarProducto(app)
api.modificarProducto(app)
api.agregarProducto(app)

app.listen(PORT, () => {
  console.log("Listening in port: ", PORT);
});

app.on("Error", (err) => console.log("Error: ", err));
