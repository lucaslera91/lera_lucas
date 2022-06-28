// funcion asincrona
async function funcion1() {
    return 'Hola Mundo'
}

// funcion con promesa

function funcion2() {
    return Promise.resolve("Hola!")
}

funcion2()
    .then(
        function(value) {return "Exito"},
        function (error) {return "Error"}
    );

console.log(funcion2())
        

