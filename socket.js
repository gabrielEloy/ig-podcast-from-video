const express = require('express')
const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use(express.json());
const server = http.createServer(app);

const io = socketIO(server);

app.post('/', (req, res) => {
    const { videoId } = req.query;
    const { status, s3Link } = req.body;
    
    try {
        io.emit(videoId, {status, s3Link})
        res.status(200).send({ok: true})
    } catch (err){
        res.status(500).send({err})
    }
})


server.listen(7777, () =>  console.log('socket server'))