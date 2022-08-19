const express = require("express");
const ProductManager = require("../utils/productManager");
const ChatManager = require("../utils/messageManager");
const routerRegistro = express.Router();
const filepath = "productos.txt";
const filepath2 = "chats.txt";

const productos = new ProductManager(filepath);
const chat = new ChatManager(filepath2);

routerRegistro.get("/", async (req, res) => {
  const auxProd = await productos.fetchProductos();
  const auxChat = await chat.fetchChats();
  return res.render("./registro/registro", { productos: auxProd, msgs: auxChat });
});


module.exports = routerRegistro;
