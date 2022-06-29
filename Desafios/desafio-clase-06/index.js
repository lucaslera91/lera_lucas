const PORT = 8080;
const express = require("express");
const fs = require("fs");
const app = express();
const filepath = "productos.txt";

const getProductos = async () => {
  const archivo = await fs.promises.readFile(filepath, "utf-8");
  return archivo;
};

app.get("/productos", async (res, req) => {
  const data = await getProductos();

  return req.json({ productos: JSON.parse(data).productos });
});

app.get("/productosRandom", async (res, req) => {
  const data = await getProductos();
  const productos = JSON.parse(data).productos;
  const ids = productos.map((elementos) => elementos.id);
  const randomId = parseInt(Math.random() * ids.length);
  return req.json({ id: ids[randomId], producto: productos[randomId] });
});

app.listen(PORT, () => {
  console.log("Listening in port: ", PORT);
});

app.on("Error", (err) => console.log("Error: ", err));
