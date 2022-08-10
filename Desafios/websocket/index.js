const PORT = 8081;
const rutaProductos = require("./router/RutaProductos");
const rutaRegistro = require("./router/RutaRegistro");
const MessageManager = require("./utils/messageManager");
const filepathChat = "chats.txt";
const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public/js"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/api/productos", rutaProductos);
app.use("/api/registro", rutaRegistro);

app.on("Error", (err) => console.log("Error: ", err));

const chatManager = new MessageManager(filepathChat);

//-- - - - - - - -- SOCKET DATA --- - - - - --- - --  //

const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");
//const PORT = process.env.PORT || 8080;

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

const messages = [];

socketServer.on("connection", (socket) => {
  socketServer.emit("INIT", "Bienvenido al inicio de WebSocket");

  socket.on("POST_MESSAGE", async (msg) => {
    const addMsg = await chatManager.agregarMensaje(msg);
    //const listaActualizada = addMsg()
    socketServer.sockets.emit("UPDATE_CHAT", msg);
  });

  socket.on("POST_PRODUCTO", (msg) => {
    fetch("http://localhost:8081/api/productos")
      .then((response) => response.json())
      .then((data) => console.log(data));

    socketServer.sockets.emit("UPDATE_PRODUCTO", msg);
  });

  //socket.on("TEST_MESSAGE", (func) => {
  //  socketServer.sockets.emit("TEST_MESSAGE", func);
  //});
  //
  //socket.on("AUX_MESSAGE", (test) => {
  //  console.log(test)
  //  socketServer.sockets.emit("AUX_MESSAGE", test);
  //});
});

httpServer.listen(PORT, () => {
  console.log(`Server with WS listening on port ${PORT}`);
});
