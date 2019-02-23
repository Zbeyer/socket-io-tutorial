// https://github.com/iamshaunjp/websockets-playlist/blob/lesson-2/index.js

var express = require('express');
var socket = require('socket.io');

// New Express App 
var app = express();

// Start new server on 4000
var server = app.listen(4000, function() {
    console.log('Listening on port 4000');
})

// Use Express to Serve Static Files
app.use(express.static('public'));

// Socket.io setup on server
var io = socket(server)

// on connection made
io.on('connection', function(socket) {
    console.log('made socket connection %o', socket.id);
    // console.log('made socket connection');

    // Listen to 'chat' message
    socket.on('chat', function(data){
        //send out to all clients data
        //emit 'chat'
        io.sockets.emit('chat', data);
    });

    //Listen to 'typing' events
    socket.on('typing', function(data) {
        //Broadcast sends to everyone but the initial sender
        socket.broadcast.emit('typing', data)
    });
});