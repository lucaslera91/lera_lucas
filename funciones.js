// normal 
function normalFunction() {
    return 'Normal function'
}

// arrow

const arrowFunction = () => console.log('Function arrow')

// callbacks

const primera = () => {
    return segunda('Hola', 'Mundo')
}

function segunda(primera, segunda) {
    console.log(primera, segunda)
}
primera()

// promesas

function dividir(dividendo, divisor) {
    return new Promise((resolve, reject) => {
        divisor === 0 ?
            reject('No se puede dividir por 0') :
            resolve(dividendo / divisor)
    })
}

console.log(dividir(4,5))
console.log(dividir(4,0))

