const PORT = 8081;
const rutaProductos = require("./router/RutaProductos");
const rutaRegistro = require("./router/RutaRegistro");
const MessageManager = require("./utils/messageManager");
const ProductManager = require("./utils/productManager");
const filepathChat = "chats.txt";
const filepathProductos = "productos.txt";

const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/api/productos", rutaProductos);
app.use("/api/registro", rutaRegistro);

app.on("Error", (err) => console.log("Error: ", err));

const chatManager = new MessageManager(filepathChat);
const prodManager = new ProductManager(filepathProductos);

//-- - - - - - - -- SOCKET DATA --- - - - - --- - --  //

const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");
//const PORT = process.env.PORT || 8080;

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

const messages = [];

socketServer.on("connection", (socket) => {

  socketServer.emit("INIT", `Bienvenido`);
  socket.on("POST_MESSAGE", async (msg) => {
    const { correo, fecha, mensaje } = msg;
    if (correo === "" || mensaje === "") {
      socketServer.sockets.emit("ERROR_CHAT", msg);
    } else {
      const addMsg = await chatManager.agregarMensaje(msg);
      socketServer.sockets.emit("UPDATE_CHAT", msg);
    }
  });

  socket.on("POST_PRODUCTO", async (msg) => {
    await prodManager.agregarProducto(msg);
    socketServer.sockets.emit("UPDATE_PRODUCTO", msg);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server with WS listening on port ${PORT}`);
});
