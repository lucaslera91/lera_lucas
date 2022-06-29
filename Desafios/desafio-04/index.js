var fs = require("fs");
const filePath = "productos.txt";

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async save(obj) {
    try {
      let archivo = await fs.promises.readFile(filePath, "utf-8");

      if (archivo !== "") {
        const archivo = await fs.promises.readFile(filePath, "utf-8");
        let productos = JSON.parse(archivo).productos;
        const ids = productos.map((producto) => producto.id);
        const max = Math.max(...ids);
        obj.id = max + 1;
        productos.push(obj);
        await fs.promises.writeFile(
          filePath,
          `${JSON.stringify({ productos: productos })}`
        );
      } else {
        obj.id = 1;
        await fs.promises.appendFile(
          filePath,
          `${JSON.stringify({ productos: [obj] })}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  showName() {
    console.log(this.nombre);
  }

  async getById(id) {
    try {
      const archivo = await fs.promises.readFile(filePath, "utf-8");

      const productos = JSON.parse(archivo).productos;

      const productoById = productos.filter((item) => item.id === id);

      console.log(productoById);
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const archivo = await fs.promises.readFile(filePath, "utf-8");

      const productos = JSON.parse(archivo).productos;

      console.log(productos);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      const archivo = await fs.promises.readFile(filePath, "utf-8");

      if (archivo !== "") {
        const productos = JSON.parse(archivo)?.productos;

        const productExists = productos.find((producto) => producto.id === id);

        if (productExists) {
          const finalItems = productos.filter((item) => item.id !== id);
          await fs.promises.writeFile(
            filePath,
            `${JSON.stringify({ productos: finalItems })}`
          );
          console.log(id, "deleted");
        } else {
          console.log("Producto no existe");
        }
      } else {
        console.log("Archivo Vacio");
      }
    } catch (err) {
      console.log(err);
    }
  }

  deleteAll() {
    try {
      fs.promises.writeFile(file, "", "utf-8");
    } catch (error) {
      console.log(error);
    }
  }
}

const prueba = new Contenedor("Prueba");

prueba.save({
  title: "Nombre del producto",
  price: "Precio",
  thumbnail: "Url Imagen",
});

prueba.getById(2);

prueba.getAll();

prueba.deleteById(1);

// notar que deben descomentar delete All.. prbar al final para que sea mas facil

// prueba.deleteAll()
