import {socket} from './client.js';
import {createNewMessage} from './chatView.js'

export function sendMessage(msg) {
    socket.emit('message', msg);
}

socket.on('message', function(msg){
    createNewMessage(msg, true);
});
