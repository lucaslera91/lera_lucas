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

routerRegistro.get("/", async (req, res) => {
  //const auxProd = await productos.fetchProductos();
  const productos = await databaseProductos(tableName).select();
  const auxChat = await chat.fetchChats();
  return res.render("./registro/registro", { productos: productos, msgs: auxChat });
});


module.exports = routerRegistro;
