const express = require("express");
const ProductManager = require("../utils/productManager");
const ChatManager = require("../utils/messageManager");
const routerRegistro = express.Router();
const filepath = "productos.txt";
const filepath2 = "chats.txt";
const knex = require("knex");
const knexConfigMySql = require("../knexfileMySql");
const knexConfigSqlite = require("../knexfileSqlite");
const databaseProductos = knex(knexConfigMySql);
//const databaseChat = knex(knexConfigSqlite);
const tableName = "productos";

const productos = new ProductManager(filepath);
const chat = new ChatManager(filepath2);

// routerRegistro.get("/", async (req, res) => {
//   //const auxProd = await productos.fetchProductos();
//   const auxProd = productos.getProductos;
//   console.log('prod', auxProd)
//   const auxChat = await chat.fetchChats(req, res);
//   console.log(auxChat)
// return res.render("./registro/registro", { productos: productos, msgs: auxChat });
// });
routerRegistro.get("/", async (req, res, next) => {
  //si ejecuto asi, me dice que tengo envio de datos http repetidos
  const chats = await chat.fetchChats();
  //si envio asi me dice que no reconoce res
  //const chats2 = await chat.fetchChats();

  // como debo hacer para pasar parametros y que se mantengan las peticiones req, res.
  const auxProductos = await productos.getProductos();
  return res.render("./registro/registro", {
    productos: auxProductos,
    msgs: chats,
  });
});

// sino me qudan asi, y no puedo reutilizar codigo
routerRegistro.get("/", productos.getProductos);
routerRegistro.get("/", chat.fetchChats);

routerRegistro.post("/", chat.agregarMensaje);

module.exports = routerRegistro;
