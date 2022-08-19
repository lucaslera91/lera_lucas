const PORT = 8081;
const rutaProductos = require("./router/RutaProductos");
const routerCart = require("./router/RutaCarrito");
const MessageManager = require("./utils/messageManager");
const ProductManager = require("./utils/productManager");
const filepathChat = "chats.txt";
const filepathProductos = "productos.txt";

const express = require("express");
const cors = require("cors");
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

const aux = {
  cart: {
    id: "asd",
    timestamp: "3am",
    productos: [
      {
        id: 1,
        timestamp: "3:50",
        nombre: "Heladera",
        descripcion: "Enfria todo lo que le entra",
        codigo: "1111",
        foto: "https://images.samsung.com/is/image/samsung/ar-heladera-rt43k6235bsbg-rt43k6235bs-bg-rperspactiveblack-169639758?$720_576_PNG$",
        precio: 234,
        stock: 23,
      },
      {
        id: 1,
        timestamp: "3:50",
        nombre: "Heladera",
        descripcion: "Enfria todo lo que le entra",
        codigo: "1111",
        foto: "https://images.samsung.com/is/image/samsung/ar-heladera-rt43k6235bsbg-rt43k6235bs-bg-rperspactiveblack-169639758?$720_576_PNG$",
        precio: 234,
        stock: 23,
      },
    ],
  },
};
