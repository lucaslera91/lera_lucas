var fs = require("fs");
const filePath = "productos.txt";

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async save(obj) {
    try {
      let archivo = await fs.promises.readFile(filePath, "utf-8");
      let productos = JSON.parse(archivo)?.productos;

      if (productos.length > 0) {
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
        await fs.promises.writeFile(
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
      if (productos.length > 0) {
        const productoById = productos.filter((item) => item.id === id);
        console.log(productoById);
      } else {
        console.log("Producto no existe");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const archivo = await fs.promises.readFile(filePath, "utf-8");
      const productos = JSON.parse(archivo).productos;

      if (productos.length > 0) {
        console.log(productos);
      } else {
        console.log("No hay productos");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      const archivo = await fs.promises.readFile(filePath, "utf-8");
      const productos = JSON.parse(archivo)?.productos;

      if (productos.length > 0) {
        const productExists = productos.find((producto) => producto.id === id);
        //console.log(productExists)
        if (productExists) {
          const finalItems = productos.filter((item) => item.id !== id);
          console.log(finalItems);
          await fs.promises.writeFile(
            filePath,
            `${JSON.stringify({ productos: finalItems })}`
          );
          console.log(id, "deleted");
        } else {
          console.log("No hay producto con ese id");
        }
      } else {
        console.log("No hay productos existentes");
      }
    } catch (err) {
      console.log(err);
    }
  }

  deleteAll() {
    try {
      fs.promises.writeFile(filePath, '{"productos":[]}', "utf-8");
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

prueba
  .save({
    title: "Nombre del producto",
    price: "Precio",
    thumbnail: "Url Imagen",
  })
  .then(() => {
    prueba.getById(1);

    prueba.getAll();

    prueba.deleteById(14);
  });

//Ejecutar individualmente para ver funcionamiento
//prueba.deleteAll()

//los metodos se pueden ejecutar invidualmente tambien

//prueba.getById(2);

//prueba.getAll();

//prueba.deleteById(3);