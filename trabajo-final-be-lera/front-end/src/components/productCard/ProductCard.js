import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductosEditar from "../edicionProductos/ProductosEditar";
import "./productCard.css";

const ProductCard = ({ producto, actualizarLista }) => {
  const { id, precio, foto, nombre, timestamp, descripcion, codigo, stock } =
    producto;
  const [isActualizar, setIsActualizar] = useState(false);

  const eliminar = async () => {
    if (
      window.confirm(`Seguro que quieres eliminar ${producto.title}`) != true
    ) {
      return;
    }
    try {
      const deleteProduct = await fetch(
        `http://localhost:8081/api/productos/${producto.id}`,
        {
          method: "DELETE",
          body: JSON.stringify({ id: producto.id }),
        }
      );
      const res = await deleteProduct.json().then(() => actualizarLista());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateActualizar = () => {
    setIsActualizar(!isActualizar);
    actualizarLista();
  };

  return (
    <div className="product-container-main card">
      {isActualizar && (
        <ProductosEditar
          salirActualizar={updateActualizar}
          producto={producto}
        />
      )}

      {!isActualizar && (
        <>
          <img src={foto} />
          <div className="product-container-text">
            <p>{nombre}</p>
            <h3>{precio} USD</h3>
          </div>
          <p>{descripcion}</p>
          <p>SKU: {codigo}</p>
          <p>stock: {stock} unidades</p>
          <div>
            <Link className="link-decoration" to={`/productos/${id}`}>
              <button>Detalles</button>
            </Link>
            <button >Add to cart</button>
          </div>
          <div>
            <button onClick={() => setIsActualizar(true)}>Actualizar</button>
            <button className="eliminar" onClick={eliminar}>
              Eliminar
            </button>
            <p className="product-id-card">id: {id}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
