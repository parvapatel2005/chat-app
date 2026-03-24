require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});