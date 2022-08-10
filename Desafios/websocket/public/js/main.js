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
  document.getElementById("correo-mensaje").value = "";
  document.getElementById("mensaje-mensaje").value = "";
};

socket.on("UPDATE_CHAT", (msg) => {
  appendMsg(msg);
});

const postProducto = () => {
  console.log("PRODUCTO");
  const title = document.getElementById("nombre-producto");
  const price = document.getElementById("precio-producto");
  const thumbnail = document.getElementById("img-producto");

  socket.emit("POST_PRODUCTO", {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  });

  title.value = "";
  price.value = "";
  thumbnail.value = "";
};

const appendProducto = (msg) => {
  document.querySelector("#producto-lista").innerHTML += `
        <tr>
          <td>${msg.title}</td>
          <td>${msg.price}</td>
          <td>${msg.thumbnail}</td>
        </tr>
    `;
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
