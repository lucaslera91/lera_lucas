
function closureTest (){
    const aux = 'Texto de funcion'
    return function () {
        console.log(aux)
    }
}
const testeo = closureTest()

testeo()

