import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetailStyle.css";

const ProductDetail = () => {
  const [producto, setProducto] = useState({});
  const { id } = useParams();
  const getProducto = async () => {
    axios
      .get(`http://localhost:8081/api/productos/${id}`)
      .then((res) => {
        const {productos} = res.data
        setProducto(productos[0]);
      })
      .catch((e) => console.log(e));
  };
  
  useEffect(() => {
    getProducto()
  }, []);

  const { title, price, thumbnail } = producto;
  return (
    <div className="product-container-detail">
      <div>
        <p>{title}</p>
        <h5>{price}</h5>
      </div>
      <img src={thumbnail} />
      <div>
        <button>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
