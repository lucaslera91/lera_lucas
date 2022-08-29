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
// routerRegistro.get("/", async (req, res, next) => {
//   // const chats = await chat.fetchChats(req, res);
//   // const auxChat = chats.json()
//   // //const auxProductos = await productos.getProductos(req, res, next, true);
//   // console.log(chats);
//   // //console.log(auxProductos);
//   // return res.render("./registro/registro", {
//   //   productos: ['productos'],
//   //   msgs: auxChat,
//   // });
// });
routerRegistro.get("/", () => productos.getProductos(req, res, next, true));
routerRegistro.get("/", chat.fetchChats);

routerRegistro.post("/", chat.agregarMensaje);

module.exports = routerRegistro;
