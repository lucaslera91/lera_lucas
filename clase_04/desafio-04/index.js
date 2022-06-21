var fs = require('fs')
const { parse, format } = require('path')
var readLine = require('readline')

//formato:
// {
//     title: ('Nombre del producto'),
//     price: ('Precio'),
//     thumbnail: ('Url Imagen')
// }

//Utilizar async y await / manejo de errores

// Crear test, contenedor de productos. que se guarde en el archivo: 'productos.txt'

const getArrays = async (file) => {
    try {
        if (fs.existsSync(file)) {
            const archivo = await fs.promises.readFile(file, 'utf-8')
            const formatData = archivo.split(';\n')
            formatData.pop()
            const aux = formatData.map(element => JSON.parse(element))
            return aux
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

const existeArchivo = (file) => {
    return fs.existsSync(file)
}

const manageData = async (obj, file) => {
    try {
        const existe = fs.existsSync(file)
        let formatData;
        if (existe) {
            const archivo = await fs.promises.readFile(file, 'utf-8')
            console.log(archivo)
            formatData = archivo.split(';')
        }

        if (existe && formatData.length > 1) {
            formatData.pop()
            const ids = formatData.map(obj => JSON.parse(obj).id)
            const max = Math.max(...ids)
            obj.id = max + 1
            await fs.promises.appendFile(file, `${JSON.stringify(obj)};\n`)
        } else {
            obj.id = 1
            await fs.promises.appendFile(file, `${JSON.stringify(obj)};\n`)
        }

    } catch (error) {
        console.log(error)
    }
}

const clearFile = async (file) => {
    try {
        fs.promises.writeFile(file, '', 'utf-8')
    } catch (error) {
        console.log(error)
        console.log('archivo no existe')
    }
}

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre
    }

    save(obj) {
        // Number: Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        //Incorpora al producto un ID, debera ser siemre uno mas que q el id , no puede estar repetido
        //Tener en cuenta el archivo anterior, en caso de existir
        //console.log(JSON.stringify(obj))
        //buscar si existe archivo
        //buscar listado de objetos
        //agregar(obj)
        manageData(obj, 'productos.txt')
    };

    showName() {
        console.log(this.nombre)
    }

    getById(id) {
        //Object - Recibe un id y devuelve el objeto con ese id, o null si no esta
        getArrays('productos.txt')
            .then(res => {
                console.log(res.filter(item => item.id === id))
            })
    };

    getAll() {
        //Object [] - Devuelve un array con los objetos presentes en el archivo
        getArrays('productos.txt')
            .then(res => {
                console.log(res)
            })
    };

    deleteById(id) {
        // Void - elimina del archivo el objeto con el id buscado
        //buscar array de objetos.
        //Eliminar el objeto de id indicado
        // Reescribir el archivo

        getArrays('productos.txt')
            .then(res => {
                let aux = res.filter(obj => obj.id !== id)
                clearFile('productos.txt')
                    .then(() => {
                        for (const obj of aux) {
                            fs.promises.appendFile('productos.txt', `${JSON.stringify(obj)};\n`)
                        }
                    })
            })
    };

    deleteAll() {
        // Void - Elimina todos los objetos presentes en el archivo
        clearFile('productos.txt')
    };
}

const prueba = new Contenedor('Prueba')
//prueba.save(
//    {
//        title: 'Nombre del producto',
//        price: 'Precio',
//        thumbnail: 'Url Imagen'
//    }
//)

//prueba.getById(9)

//prueba.getAll()

//prueba.deleteById(11)

//prueba.deleteAll()

var stats = fs.statSync("productos.txt")
var fileSizeInBytes = stats.size;
// Convert the file size to megabytes (optional)
var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
console.log(fileSizeInBytes)
console.log(fileSizeInMegabytes)
