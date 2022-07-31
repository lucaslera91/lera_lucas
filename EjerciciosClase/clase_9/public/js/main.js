const socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("INIT", (msg) => {
  console.log(msg);
});

socket.on("NEW_MESSAGE", (msg) => {
    appendMsg(msg);
});

const appendMsg = (msg) => {
  document.querySelector("#posts").innerHTML += `
    <div class="post ui card">
        <div class="div ui container">
        ${msg.nombre}: ${msg.mensaje}
        </div>
    </div>
    `;
};

const enviarMensaje = () => {
  const nombre = document.querySelector("#nombre").value;
  const mensaje = document.querySelector("#mensaje").value;

  socket.emit("POST_MESSAGE", { nombre: mensaje });
};
