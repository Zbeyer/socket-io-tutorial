// with ES6 import
// import io from 'socket.io-client';

// var socket = io.connect('http://localhost:4000');
var socket = io('http://localhost:4000');
socket.on('connect', function () {});
socket.on('event', function (data) {});
socket.on('disconnect', function () {});

/**
 * Element Registration
 */

var message = document.getElementById('message');
    handle = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

/**
 * HTML updates...
 */

function updateOutput(data) {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
}

function updateFeedback(data) {

    if ((data.handle.length > 0) && (data.message.length > 0)) {
        feedback.innerHTML = '<p><i>' + data.handle + '</i> typing...' + data.message + '</p>';
    } else {
        feedback.innerHTML = '';
    }
}

/**
 * client.emit
 *  +---server.on 
 *      +---server.emit
 *          +---client.on
 */

// Emit Event
function sendChat() {
    //emit to server 'chat' passing message / handle data...
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });

    socket.emit('typing', {
        handle: '',
        message: ''
    });
}

function sendTyping() {
    //emit to server user is 'typing'
    socket.emit('typing', {
        handle: handle.value,
        message: message.value
    });
}   

function sendErase() {
    //emit to server user is 'typing'
    socket.emit('typing', {
        handle: handle.value,
        message: ''
    });
}

/**
 * Listeners from server
 */

// Listen for events on 'chat'
socket.on('chat', function(data){
    //Update inner HTML of output on client with server emmitted data
    updateOutput(data);
});

// Listen for 'typing' broadcast event
socket.on('typing', function(data) {
    updateFeedback(data);
});

/**
 * EVENT LISTENERS : Control Registration...
 */

//Button Event—Click
btn.addEventListener('click', function () {
    // Emit 'chat' message
    sendChat();
});

// Enter Key Click
message.addEventListener("keydown", KeyCheck); //or however you are calling your method
function KeyCheck(event) {
    var KeyID = event.keyCode;
    switch (KeyID) {
        case 8: // backspace
        case 46: // delete
            sendErase();
            break;
        case 13: // enter
            sendChat();
            break;
        default:
            sendTyping();
            break;
    }
}