const PORT = 8080;
const express = require("express");
const fs = require("fs");
const { CLIENT_RENEG_WINDOW } = require("tls");
const app = express();
const filepath = "productos.txt";
//const bodyParser = require('body-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getProductos = async () => {
  const archivo = await fs.promises.readFile(filepath, "utf-8");
  return archivo;
};

app.get("/api/productos", async (req, res) => {
  const data = await getProductos();
  return res.json({ productos: JSON.parse(data).productos });
});

app.get("/api/productos/:id", async (req, res) => {
  const data = await getProductos();
  const productos = JSON.parse(data).productos;
  const producto = productos.filter(
    (producto) => Number(producto.id) === Number(res.params.id)
  );
  return res.json({ productos: producto });
});

app.post("/api/productos", async (req, res) => {
  const data = await getProductos();
  const productos = JSON.parse(data).productos;
  let object = req.body;
  try {
    const ids = productos.map((producto) => producto.id);
    const max = Math.max(...ids);
    object.id = max + 1;
    productos.push(object);
    await fs.promises.writeFile(
      filepath,
      `${JSON.stringify({ productos: productos })}`
    );
  } catch (error) {
    console.log(error);
  }

  return res.json({ productos: productos });
});

app.put("/api/productos/:id", async (req, res) => {
  const data = await getProductos();
  const productos = JSON.parse(data).productos;
  let isProducto = false;
  const productosActualizados = productos.map((producto) => {
    if (Number(producto.id) === Number(req.params.id)) {
      const prodAux = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: producto.id,
      };
      isProducto = true;
      return prodAux;
    } else {
      return producto;
    }
  });
  if (isProducto) {
    await fs.promises.writeFile(
      filepath,
      `${JSON.stringify({ productos: productosActualizados })}`
    );
    return res.json({ productos: productosActualizados });
  } else {
    return res.json({ msg: "Producto no existe" });
  }
});

app.delete("/api/productos/:id", async (req, res) => {
  const data = await getProductos();
  const productos = JSON.parse(data).productos;
  const listaActualizada = productos.filter( producto => Number(producto.id) === Number(req.params.id));

  if (listaActualizada.length < productos.length) {
    await fs.promises.writeFile(
      filepath,
      `${JSON.stringify({ productos: listaActualizada })}`
    );
    return res.json({ productos: listaActualizada });
  } else {
    return res.json({ msg: "Producto no existe" });
  }
});

app.listen(PORT, () => {
  console.log("Listening in port: ", PORT);
});

app.on("Error", (err) => console.log("Error: ", err));
