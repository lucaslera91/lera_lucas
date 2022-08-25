import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";

const ProductList = () => {
  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    axios
      .get("http://localhost:8081/api/productos")
      .then((res) => {
        setProductos(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (productos.length === 0) getProductos();
  }, [productos]);

  return (
    <div>
      {productos.lenght < 1 && <h5>No hay productos</h5>}
      {productos.length > 1 &&
        productos.map((producto) => (
          <ProductCard
            actualizarLista={getProductos}
            key={producto.id}
            producto={producto}
          />
        ))}
    </div>
  );
};

export default ProductList;
