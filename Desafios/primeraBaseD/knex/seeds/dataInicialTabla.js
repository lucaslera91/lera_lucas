/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('personas').del()
  await knex('personas').insert([
    {nombre: 'Juan', apellido:'Topo'},
    {nombre: 'Pedro', apellido:'El Escamoso'},
    {nombre: 'Martin', apellido:'Palermo'},
    {nombre: 'Javi', apellido:'Xavi'},
    {nombre: 'Ignacio', apellido:'Scocco'},
    {nombre: 'Lucas', apellido:'Moura'},
    {nombre: 'Mato', apellido:'Espinetta'},
  ]);
};
