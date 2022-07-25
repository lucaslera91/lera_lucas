const PORT = 8080;
const rutaProductos = require('./router/RutaProductos');
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", rutaProductos);

app.listen(PORT, () => {
  console.log("Listening in port: ", PORT);
});

app.on("Error", (err) => console.log("Error: ", err));
