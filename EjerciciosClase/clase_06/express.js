const express = require('express');
const app = express();
const port = 3100;

app.get('/', (res, req) => {
    req.send('Hola Comision 31010!!')
})

app.listen(port, () => {
    console.log('Servidor corriendo en', port)
})

app.on('error', err => console.log('Error: ', err))