const http = require('http')

const resolucion = () => {
    const hora = new Date().getHours()
    if (hora >= 6 && hora <= 12){
        return 'Buenos Dias'
    } else if (hora >= 13 && hora <= 19){
        return 'Buenas tardes'
    } else {
        return 'Buenas noches'
    }
}

const server = http.createServer((req, res) => {
    res.end(resolucion())
})

const connectedServer = server.listen(8090, () => {
    console.log('Servidor escuchando', connectedServer.address().port)
})