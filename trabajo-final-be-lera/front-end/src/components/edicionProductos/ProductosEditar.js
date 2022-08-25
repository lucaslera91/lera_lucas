import axios from "axios";
import React, { useEffect, useState } from "react";
import "./productosEditarStyle.css";

const ProductosEditar = ({ producto, salirActualizar }) => {
  const [isEditar, setIsEditar] = useState(false);
  //const [option, setOption] = useState({});

  const actualizar = async (e) => {
    e.preventDefault();
    let url;
    let type;
    producto?.id ? (type = "put") : (type = "post");
    const options = {
      nombre: e.target[0].value,
      precio: e.target[1].value,
      codigo: e.target[2].value,
      descripcion: e.target[3].value,
      stock: e.target[4].value,
      foto: e.target[5].value,
    };
    try {
      const reqOptions = {
        method: type,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(options),
      };
      type === "put"
        ? (url = `http://localhost:8081/api/productos/${producto.id}`)
        : (url = "http://localhost:8081/api/productos");
      console.log(url);

      const aux = await fetch(url, reqOptions);
      const res = await aux.json().then(() => {
        if (type === "post") {
          window.location.reload();
        } else {
          salirActualizar();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h4>Edit Product</h4>
      <form className="edit-form" onSubmit={(e) => actualizar(e)}>
        <input defaultValue={producto?.nombre ?? ""} placeholder="Nombre" />
        <input defaultValue={producto?.precio ?? ""} placeholder="Precio" />
        <input defaultValue={producto?.codigo ?? ""} placeholder="Codigo" />
        <input
          defaultValue={producto?.descripcion ?? ""}
          placeholder="Descripcion"
        />
        <input defaultValue={producto?.stock ?? ""} placeholder="Stock" />
        <input
          defaultValue={producto?.foto ?? ""}
          placeholder="URL for Thumbnail"
        />
        {producto?.id && (
          <>
            <input defaultValue={producto?.id} />
            <div>
              <button type="submit">Actualizar</button>
              <button type="button" onClick={salirActualizar}>
                Cancelar
              </button>
            </div>
          </>
        )}
        {!producto?.id && (
          <>
            <button type="submit">Crear</button>
            <button className="cancelar" onClick={salirActualizar}>
              Cancelar
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ProductosEditar;
