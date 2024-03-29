var express = require('express');
var socket = require('socket.io');

const port = process.env.PORT || 4000;
//App setup
var app = express();
var server = app.listen(port, () => {
    console.log(`Listening to request on ${port}`);
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function (socket) {
    console.log('made socket connection', socket.id);
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit("typing", data);
    });
});

