import React from "react";
import { Link } from "react-router-dom";
import "./cartCardStyle.css";

const CartCard = ({ producto }) => {
  return (
    <div className="container-cart-card">
      <p className="nombre-cart-card">{producto.nombre}</p>
      <p className="descripcion-cart-card">{producto.descripcion}</p>
      <p className="precio-cart-card">{producto.precio} USD</p>
      <p className="stock-cart-card">{producto.stock} unidades</p>
      <img className="foto-cart-card" src={producto.foto} />
      <div>
        <Link className="link-decoration" to={`/productos/${producto.id}`}>
          <button>Detalles</button>
        </Link>
      </div>
      <div>
        <button className="eliminar" >
          Eliminar de cart
        </button>
      </div>
    </div>
  );
};

export default CartCard;
