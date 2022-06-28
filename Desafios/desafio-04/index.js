var fs = require("fs");
const filePath = "productos.txt";

//Utilizar async y await / manejo de errores

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async save(obj) {
    try {
      const existe = fs.existsSync(filePath);
      let archivo;
      if (existe) {
        archivo = await fs.promises.readFile(filePath, "utf-8");
      }

      if (existe && archivo !== "") {
        const archivo = await fs.promises.readFile(filePath, "utf-8");
        //let productos = []
        let productos = JSON.parse(archivo).productos;
        console.log(productos);
        const ids = productos.map((producto) => producto.id);
        console.log(ids);
        const max = Math.max(...ids);
        obj.id = max + 1;
        productos.push(obj);
        await fs.promises.writeFile(
          filePath,
          `${JSON.stringify({ productos: productos })}`
        );
      } else {
        console.log("aca");
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
    //Object - Recibe un id y devuelve el objeto con ese id, o null si no esta
    const archivo = await fs.promises.readFile(filePath, "utf-8");

    const productos = JSON.parse(archivo).productos;

    const productoById = productos.filter((item) => item.id === id);

    console.log(productoById);
  }

  async getAll() {

    const archivo = await fs.promises.readFile(filePath, "utf-8");

    const productos = JSON.parse(archivo).productos;

    console.log(productos);
  }

  async deleteById(id) {
    try {
      const archivo = await fs.promises.readFile(filePath, "utf-8");

      if (archivo !== "") {
        const productos = JSON.parse(archivo)?.productos;

        const productExists = productos.find(producto => producto.id === id);

        if (productExists) {

          const finalItems = productos.filter((item) => item.id !== id);
          await fs.promises.writeFile(file,`${JSON.stringify({ productos: finalItems })}`);

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
    // Void - Elimina todos los objetos presentes en el archivo
    clearFile("productos.txt");
  }
}

const prueba = new Contenedor("Prueba");
prueba.save({
  title: "Nombre del producto",
  price: "Precio",
  thumbnail: "Url Imagen",
})
prueba.getById(5)
prueba.getAll()
prueba.deleteById(3)
//prueba.deleteAll()
