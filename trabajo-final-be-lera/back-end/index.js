const PORT = 8081;
const rutaProductos = require("./router/RutaProductos");
const routerCart = require("./router/RutaCarrito");

const express = require("express");
const cors = require('cors')
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/productos", rutaProductos);
app.use("/api/carrito", routerCart);

app.listen(PORT, () => {
  console.log("Listening in port: ", PORT);
});

app.on("Error", (err) => console.log("Error: ", err));
