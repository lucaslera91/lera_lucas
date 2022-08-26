const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");
//const PORT = process.env.PORT || 8080;

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  socketServer.emit("INIT", "Bienvenido al inicio de WebSocket");

  socket.on("POST_MESSAGE", (msg) => {
    console.log(msg);
    socketServer.sockets.emit("POST_MESSAGE", {
      msg: "Esto es un mensaje para node",
    });
    socketServer.sockets.emit("POST_MESSAGE", msg);
  });
  socket.on("TEST_MESSAGE", (func) => {
    socketServer.sockets.emit("TEST_MESSAGE", func);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server with WS listening on port ${PORT}`);
});
