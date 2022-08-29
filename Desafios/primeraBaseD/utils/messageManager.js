
const filepath = "chats.txt";
require("dotenv").config();
console.log(process.env.RUTAMOTORPRODUCTOS);

const knex = require("knex");
const knexConfig = require("../knexfileSqlite");
const database = knex(knexConfig);
const tableName = "chats";

const getChats = async () => {
  const archivo = await database(tableName).select();
  return archivo;
};

module.exports = class ChatManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async fetchChats(req, res) {
    try {
      const archivo = await database(tableName).select();
      return archivo ;
    } catch (error) {
      console.log(error)
      // return res.json({ msg: error });
  }
}
  //process.env.RUTAMOTOR

  async agregarMensaje(req, res) {
    console.log(req.body)
    let object = req.body
    try {
      const archivo = await database(tableName).insert({ ...object });
      return { mensajes: archivo};
    } catch (error) {
      console.log(error)
      return { error };
    }
  }
}
