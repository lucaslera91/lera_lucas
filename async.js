// funcion asincrona
async function funcion1() {
    return 'Hola Mundo'
}

// funcion con promesa

function funcion2() {
    return Promise.resolve("Hola!")
}

funcion2()
    .then(res => console.log(res))