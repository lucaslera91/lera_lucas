let knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "root",
    database: "DatabaseBackeEnd",
  },
  pool: { min: 0, max: 7 },
});

const getCompras = knex('compras')
  .where({ email: 'hi@example.com' })
  .then(rows => console.log(rows))

getCompras();