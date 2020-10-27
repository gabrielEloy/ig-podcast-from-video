const express = require('express')
const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use(express.json());
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', socket => {
    console.log(('new client connected'))
    socket.emit('teste', 'teste')
    socket.emit('teste2', 'bagui é doido mermão')
});

app.post('/', (req, res) => {
    const { videoId } = req.query;
    const { status } = req.body;
    
    console.log({videoId, status})

    io.emit(videoId, status)
    res.status(200).send({ok: true})
})


server.listen(7777, () =>  console.log('socket server'))