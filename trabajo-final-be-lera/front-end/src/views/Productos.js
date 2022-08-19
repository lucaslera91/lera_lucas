import React, { useState } from "react";
import ProductosEditar from "../components/edicionProductos/ProductosEditar";
import ProductList from "../components/productList/ProductList";

const Productos = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [editarProd, setEditarProd] = useState(false);
  return (
    <>
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {!isAdmin ? "Set Admin True" : "Set Amdin False"}
      </button>
      {isAdmin && (
        <button onClick={() => setEditarProd(!editarProd)}>
          Agregar Productos
        </button>
      )}
      {editarProd && <ProductosEditar />}
      <h3>Lista de productos</h3>
      <ProductList />
    </>
  );
};

export default Productos;
