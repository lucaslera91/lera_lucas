const { options } = require("./options/mairaDB.js");
const knex = requiere("knex")(options);

knex.shema
  .createTable("cars", (table) => {
    table.increments("id");
    table.string("marca");
    table.stirng("modelo");
    table.stirng("ano");
    table.integer("precio");
  })
  .then(() => {
    console.log("Tabla creada");
  })
  .catch((err) => console.log(err))
  .finally(() => {
    //knex.destroy();
  });
