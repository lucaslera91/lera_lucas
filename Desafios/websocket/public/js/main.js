const socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("INIT", (msg) => {
  console.log(msg);
});


const postMessage = () => {
  console.log("MENSAJE");
  const correo = document.getElementById("correo-mensaje").value;
  const mensaje = document.getElementById("mensaje-mensaje").value;
  const fechaAux = new Date();
  const fecha = `[ ${fechaAux.getDate()}/${fechaAux.getMonth()} - ${fechaAux.getHours()} : ${fechaAux.getMinutes()} hs ]`;
  socket.emit("POST_MESSAGE", { correo, fecha, mensaje });
  document.getElementById("correo-mensaje").value = ''
  document.getElementById("mensaje-mensaje").value = ''
  
};
  
  

  socket.on("UPDATE_CHAT", (msg) => {
    appendMsg(msg)
  });

const postProducto = () => {
  console.log("PRODUCTO");

  socket.emit("POST_PRODUCTO", {
    nombre: "nombre",
    mensaje: "mensaje",
    fecha: "fecha",
  });
};

const appendMsg = (msg) => {
  document.querySelector("#chat-messages").innerHTML += `
  <div class="card m-2 p-2">
    <p class="correo-chat">${msg.correo}</p>
    <p class="mensaje-chat">${msg.mensaje}</p>
    <div class="d-flex text-secondary">
      <p>${msg.fecha}</p>
      <p>${msg.id}</p>
  </div>
</div>
    `;
};

