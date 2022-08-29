const dotenv = require("dotenv")
dotenv.config();

const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "3306";
const DATABASE_USER = process.env.DATABASE_USER || "root";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
const DATABASE_NAME = process.env.DATABASE_NAME || "";
const DATABASE_FILENAME  = process.env.DATABASE_FILENAME || "";

// console.log(DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD);
const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: DATABASE_FILENAME
  },
migrations: {
  tableName: 'knex_migrations_sqlite',
  directory: './knex/sqlite/migrations/'
},
seeds: {
  tableName: 'knex_seeds_sqlite',
  directory: './knex/sqlite/seeds/',
}
}

module.exports = knexConfig;