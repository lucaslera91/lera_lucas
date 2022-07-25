const fs = require("fs");
const filepath = "productos.txt";

const getProductos = async () => {
  const archivo = await fs.promises.readFile(filepath, "utf-8");
  return archivo;
};

module.exports = class ApiManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async fetchProductos(req, res) {
    const data = await getProductos();
    return res.json({ productos: JSON.parse(data).productos });
  }

  async getProducto(req, res) {
    const data = await getProductos();
    const productos = JSON.parse(data).productos;
    const producto = productos.filter(
      (producto) => Number(producto.id) === Number(req.params.id)
    );

    producto.length == 0 ?
    res.json({ msg: 'El producto no existe' }):
    res.json({ productos: producto })
  }

  async agregarProducto(req, res) {
    const data = await getProductos();
    const productos = JSON.parse(data).productos;
    let object = req.body;
    try {
      const ids = productos.map((producto) => producto.id);
      const max = Math.max(...ids);
      object.id = max + 1;
      productos.push(object);
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ productos: productos })}`
      );
    } catch (error) {
      console.log(error);
    }

    return res.json({ productos: productos });
  }

  async modificarProducto(req, res) {
    const data = await getProductos();
    const productos = JSON.parse(data).productos;
    let isProducto = false;
    const productosActualizados = productos.map((producto) => {
      if (Number(producto.id) === Number(req.params.id)) {
        const prodAux = {
          title: req.body.title,
          price: req.body.price,
          thumbnail: req.body.thumbnail,
          id: producto.id,
        };
        isProducto = true;
        return prodAux;
      } else {
        return producto;
      }
    });
    if (isProducto) {
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ productos: productosActualizados })}`
      );
      return res.json({ productos: productosActualizados });
    } else {
      return res.json({ msg: "Producto no existe" });
    }
  }
  async eliminarProducto(req, res) {
    const data = await getProductos();
    const productos = JSON.parse(data).productos;
    const listaActualizada = productos.filter(
      (producto) => Number(producto.id) !== Number(req.params.id)
    );

    if (listaActualizada.length < productos.length) {
      await fs.promises.writeFile(
        filepath,
        `${JSON.stringify({ productos: listaActualizada })}`
      );
      return res.json({ productos: listaActualizada });
    } else {
      return res.json({ msg: "Producto no existe" });
    }
  }
};


