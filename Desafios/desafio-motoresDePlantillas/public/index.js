const PORT = 8080;
const rutaProductos = require("./router/RutaProductos");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", "./views");

const motor = process.env.RUTAMOTORREGISTRO;
console.log(motor);

if (motor == "index.pug") {
  app.set("view engine", "pug");

  app.get("/api/registro", (req, res) => {
    res.render("index.pug");
  });
}

if (motor === "registro") {
  app.set("view engine", "ejs");

  app.get("/api/registro", (req, res) => {
    res.render("registro");
  });
}

app.use("/api/productos", rutaProductos);

app.listen(PORT, () => {
  console.log("Listening in port: ", PORT);
});

app.on("Error", (err) => console.log("Error: ", err));
