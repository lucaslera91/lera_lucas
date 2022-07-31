const PORT = 8080;
const rutaProductos = require("./router/RutaProductos");
const rutaTest = require("./router/RutaTest");
const express = require("express");
const productos = require("./productos");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", rutaProductos);

app.use("/test", rutaTest);

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");
//app.set('view engine', 'ejs')

app.get("/productos", (req, res) => {
  console.log(productos);
  res.render("productos.pug", { productos: productos });
});

app.post("/productos", (req, res) => {
  const { nombre } = req.body;
  console.log(nombre);
  const data = productos.filter(
    (prod) => prod.title.toUpperCase().includes(nombre.toUpperCase())
  );
  res.render("productos.pug", { productos: data });
});

app.get("/", (req, res) => {
  console.log(productos);
  res.render("index.pug", {});
});

//console.log(productos)
//app.get('/ejs', (req, res) => {
//  res.render('index', {users})
//})

app.listen(PORT, () => {
  console.log("Listening in port: ", PORT);
});

app.on("Error", (err) => console.log("Error: ", err));
