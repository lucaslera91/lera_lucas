const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const PORT = process.env.PORT || 8080;

const messages = [];

const app = express()
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer)


app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + './public/index.html')
});

socketServer.on('connection', (socket) => {
    console.log('nuevo cliente conectado');
    socketServer.emit('INIT', 'Bienvenido al WebSocket')
    
    socket.on('POST_MESSAGE', (msg) => {
        messages.push(msg)
        console.log(msg)
        socketServer.sockets.emit('NEW_MESSAGE', msg)
    })
});


httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})


