class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName() {
        return `Nombre completo: ${this.nombre}, ${this.apellido}`
    };
    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota)
    };

    countMascotas() {
        return this.mascotas.length
    };

    addBook(nombre, autor){
        this.libros.push({
            nombre: nombre,
            autor: autor
        })
    }
    getBookNames(){
        return this.libros.map(element => element.nombre)
    }
}

const juan = new Usuario(
    'Juan',
    'Topo',
    [{nombre: 'Harry Potter',autro: 'J.K.R'},
    {nombre: 'El Quijote', autor: 'Miguel de Cervantes'}], 
    ['perro', 'gato']
)

console.log(juan.getFullName())
juan.addMascota('pez')
console.log(juan.mascotas)
console.log(juan.countMascotas())
juan.addBook('Martin Fierro', 'Jose Hernandez')
console.log(juan.getBookNames())
