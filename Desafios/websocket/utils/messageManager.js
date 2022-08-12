const fs = require("fs");
const filepath = "chats.txt";
require("dotenv").config();
console.log(process.env.RUTAMOTORPRODUCTOS);

const getChats = async () => {
  const archivo = await fs.promises.readFile(filepath, "utf-8");
  return archivo;
};

module.exports = class ChatManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async fetchChats() {
    const data = await getChats();
    return JSON.parse(data).chats;
  }
  //process.env.RUTAMOTOR

  async agregarMensaje(obj) {
    const data = await getChats();
    const chats = JSON.parse(data).chats;
    try {
      const user = chats.filter((chat) => chat.correo === obj.correo);
      if (user.length < 1) {
        obj.id = parseInt(Math.random() * 100000);
      } else {
        obj.id = user[0].id;
      }
      chats.push(obj);
      //onst max = Math.max(...ids);
      await fs.promises.writeFile(filepath, `${JSON.stringify({ chats })}`);
      return chats;
    } catch (error) {
      console.log(error);
    }
    //return res.json({ productos: productos });
    return JSON.parse(data).chats;
  }

  async eliminarChat(req, res) {
    const data = await getChats();
    const chats = JSON.parse(data).chats;
    const listaActualizada = chats.filter(
      (producto) => Number(producto.id) !== Number(req.params.id)
    );

    if (listaActualizada.length < chats.length) {
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ chats: listaActualizada })}`
      );
      return listaActualizada;
      return res.json({ chats: listaActualizada });
    } else {
      //eturn res.json({ msg: "Producto no existe" });
      return { msg: "No hay mensajes" };
    }
  }
};
