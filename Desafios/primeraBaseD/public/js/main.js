const socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("INIT", (msg) => {
  console.log(msg);
});

const postMessage = () => {
  console.log("MENSAJE");
  document.getElementById("correo-mensaje").classList.remove("err");
  const correo = document.getElementById("correo-mensaje").value;
  const mensaje = document.getElementById("mensaje-mensaje").value;
  const fechaAux = new Date();
  const fecha = `[ ${fechaAux.getDate()} / ${fechaAux.getMonth()} / ${fechaAux.getFullYear()} - ${fechaAux.getHours()} : ${fechaAux.getMinutes()}:${fechaAux.getSeconds()}]`;
  socket.emit("POST_MESSAGE", { correo, fecha, mensaje });
  // document.getElementById("correo-mensaje").value = "";
  document.getElementById("mensaje-mensaje").value = "";
};

socket.on("UPDATE_CHAT", (msg) => {
  appendMsg(msg);
  const container = document.getElementById("chat-messages");
  container.scrollTop = container.scrollHeight;
});
socket.on("UPDATE_PRODUCTO", (msg) => {
  console.log("first");
  appendProducto(msg);
});

socket.on("ERROR_CHAT", (msg) => {
  document.getElementById("correo-mensaje").classList.add("err");
  // document.getElementById("correo-mensaje").value = ";
});

const postProducto = () => {
  console.log("PRODUCTO");
  const nombre = document.getElementById("nombre");
  const precio = document.getElementById("precio");
  const thumbnail = document.getElementById("thumbnail");

  socket.emit("POST_PRODUCTO", {
    nombre: nombre.value,
    precio: precio.value,
    thumbnail: thumbnail.value,
  });

  nombre.value = "";
  precio.value = "";
  thumbnail.value = "";
};

const appendProducto = (msg) => {
  document.getElementById("producto-lista").innerHTML += `
        <tr>
          <td>${msg.nombre}</td>
          <td>${msg.precio}</td>
          <td><img class='table-img' src=${msg.thumbnail} alt=""></td>
        </tr>
    `;
};

const appendMsg = (msg) => {
  document.querySelector("#chat-messages").innerHTML += `

  <div class="card m-2 p-2">
    <p class="correo-chat">${msg.correo}</p>
    <p class="mensaje-chat">${msg.mensaje}</p>
    <div class="d-flex text-secondary">
      <p class="date-chat">${msg.fecha}</p>
      <p class="id-chat">id: ${msg.id}</p>
  </div>
    `;
};

